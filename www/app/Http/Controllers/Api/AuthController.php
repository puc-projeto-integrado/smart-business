<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\OauthClient;
use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

class AuthController
{

    private $baseUrl;
    private $tokenUrl;

    public function __construct(){
        $this->baseUrl = URL::to('/');
        $this->tokenUrl = $this->baseUrl.'/oauth/token';
    }

    public function login(Request $request): JsonResponse{
        if (!$this->validate($request)) {
            return $this->sendHttpStatusCode(400, 'Invalid request.');
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $credentials = $this->getCredentials($request->email);

            if(!$credentials){
                return $this->sendHttpStatusCode(401, 'Unauthorized - step 2.');
            }
            $content = $this->getBearerToken($credentials['oauthClientId'], $credentials['secret'], $request->email, $request->password);
            $content = json_decode($content, false);
            $content->name = $credentials['name'];
            $content->id = $credentials['id'];
            $content->roleId = $credentials['roleId'];

            return $this->sendHttpStatusCode(200, Null, $content);
        }
        return $this->sendHttpStatusCode(401, 'Unauthorized - step 1.');
    }

    private function validate(Request $request): bool{
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        return !$validator->fails();
    }

    public function sendHttpStatusCode(int $status, $message = null, $body = null): JsonResponse{
        $params = ['status' => $status];
        if (!is_null($message)) {
            $params['message'] = $message;
        }
        if (!is_null($body)) {
            $params['body'] = $body;
        }
        return Response::json($params, $status);
    }

    public function getCredentials(string $email){
        try {
            $result = User::where('email', $email)
                ->select('users.*', 'oauth_clients.id as oauth_client_id', 'oauth_clients.secret')
                ->join('oauth_clients', 'password_client', '=', 'users.id')->get();
        } catch (QueryException $queryException) {
            return null;
        }

        if(count($result->toArray())!==0) {
            return [
                'oauthClientId' => $result[0]->oauth_client_id,
                'secret' => $result[0]->secret,
                'name' => $result[0]->name,
                'id' => $result[0]->id,
                'roleId' => $result[0]->role_id,
            ];
        }
        return null;
    }

    public function getBearerToken($oauthClientId, $secret, $email, $password, $customUrl=Null): String{

        $client = new Client();
        $url = $this->tokenUrl;

        if($customUrl){
            $url = $customUrl;
        }

        try {
            $response = $client->post($url, [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $oauthClientId,
                    'client_secret' => $secret,
                    'username' => $email,
                    'password' => $password
                ]
            ]);

        } catch (ClientException $clientException) {
            return $this->clientExceptionHandler($clientException);
        }

        if ($response->getStatusCode() !== 200) {
            return $this->sendHttpStatusCode($response->getStatusCode(), $response->getReasonPhrase());
        }
        return $response->getBody()->getContents();
        //return $this->sendHttpStatusCode(200, Null, json_decode($response->getBody()->getContents(), true));
    }

    private function clientExceptionHandler(ClientException $exception): JsonResponse{
        if ($exception->hasResponse() && $exception->getResponse()) {
            return $this->sendHttpStatusCode(500, $exception->getResponse()->getStatusCode(), $exception->getResponse()->getReasonPhrase());
        }
        return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', $exception->getMessage());
    }

    public function addUser(Request $request){

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        if(count(User::where('email', '=', $email)->get()->toArray())>0){
            return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', 'User already exists.');
        }

        DB::transaction(function () use ($name, $email, $password) {
            try {
                $user = new User();
                $user->name = $name;
                $user->email = $email;
                $password = Hash::make($password);
                $user->password = $password;
                $user->role_id = 2;
                $user->save();

            } catch (QueryException $exception) {
                return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', $exception->getMessage());
            }

            $savedUser = User::where('email', '=', $email)->get();

            try {
                $oauthClient = new OauthClient();
                $oauthClient->name = $name;
                $oauthClient->secret = $password;
                $oauthClient->password_client = $savedUser[0]->id;
                $oauthClient->redirect = $this->baseUrl;
                $oauthClient->personal_access_client = 0;
                $oauthClient->revoked = 0;
                $oauthClient->user_id = $savedUser[0]->id;
                $oauthClient->save();

            } catch (QueryException $exception) {
                return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', $exception->getMessage());
            }
        });

        return $this->sendHttpStatusCode(200, 'Success', 'User saved');
    }

    //https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=784p4owi2ycdf8&redirect_uri=http://5d64dbafe68b.ngrok.io/public/api/oauth&state=xpto&scope=r_liteprofile%20r_emailaddress
    // http://5d64dbafe68b.ngrok.io/public/api/oauth?code=AQTbExlLfFahDsfokmMCwI-7OhzzpTVz9JGmjkXprnvnv3YnL0RQPYWYjqQuXnCpOok3p6nqbk6rDcfyF-TBV1QjLXXEVx5y9ZLR0Cg9Sx422UxKE-fP49Q5vBJxpfsUGCRglG_1AvzbjZ_iPX8Ly2shuehnA18pVr-Kw--8KnWZbj-E61ZtzxGt2z4zJNeJmoKzn_ah-A2n0IjaUBk&state=xpto

    public function social(){
        $step1 = 'https://www.linkedin.com/oauth/v2/accessToken';
        $step2 = 'https://api.linkedin.com/v2/me';
        $step3 = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
        $clientId = '784p4owi2ycdf8';
        $clientSecret = '6p2dKwhJ6hNhMcE7';
        $redirectUrl = 'http://5d64dbafe68b.ngrok.io/public/api/oauth';
        $client = new Client();

        if(isset($_GET["code"]) && !empty($_GET["code"])){
            $code = $_GET["code"];

            // Step 1
            try {
                $responseStep1 = $client->post($step1, [
                    'form_params' => [
                        'grant_type' => 'authorization_code',
                        'code' => $code,
                        'client_id' => $clientId,
                        'client_secret' => $clientSecret,
                        'redirect_uri' => $redirectUrl
                    ]
                ]);
            } catch (ClientException | Exception $e) {
                echo $e->getMessage();
            }

            if($responseStep1->getStatusCode()==200){
                $content = json_decode($responseStep1->getBody()->getContents());
                $accessToken = $content->access_token;

                // Step 2
                try {
                    $responseStep2 = $client->get($step2, ['headers' => ['Authorization' => 'Bearer '.$accessToken]]);
                } catch (ClientException | Exception $e) {
                    echo $e->getMessage();
                }

                // Set full name
                if($responseStep2->getStatusCode()==200){
                    $content = json_decode($responseStep2->getBody()->getContents());
                    $firstName = $content->localizedFirstName;
                    $lastName = $content->localizedLastName;
                }

                // Step 3
                try {
                    $responseStep3 = $client->get($step3, ['headers' => ['Authorization' => 'Bearer '.$accessToken]]);
                } catch (ClientException | Exception $e) {
                    echo $e->getMessage();
                }

                $content = json_decode($responseStep3->getBody()->getContents(), true);
                $email = $content["elements"][0]["handle~"]["emailAddress"];

                $request = new Request();
                $request->name = $firstName.' '.$lastName;
                $request->email = $email;


//                $password = rand(9999,9999);
//                $request->password = $password;

//                $this->addUser($request);
//
//                // Step 4
//                $step4 = url('/').'/api/login';
//                try {
//                    $responseStep4 = $client->post($step4, [
//                        'headers' => [
//                            'Authorization' => 'Bearer '.$accessToken
//                        ],
//                        'form_params' => [
//                            'email' => $email,
//                            'password' => $password
//                        ]
//                    ]);
//                } catch (ClientException | Exception $e) {
//                    echo $e->getMessage();
//                }
//                var_dump($responseStep4->getBody()->getContents());
            }
        }

    }

//    public function checkLogin($email, $password){
////        var_dump($request);
//        if (Auth::attempt(['email' => $email, 'password' => $password)) {
//            return 'hit';
////            $credentials = $this->getCredentials($request->email);
////
////            if(!$credentials){ Throw Exception('Unauthorized');}
////
////            $content = $this->getBearerToken($credentials['oauthClientId'], $credentials['secret'], $request->email, $request->password);
////            $content = json_decode($content, false);
////            $content->name = $credentials['name'];
////            $content->id = $credentials['id'];
////            $content->roleId = $credentials['roleId'];
////            return $content;
//        }
//        return 'Miss';
////        return False;
//    }
}
