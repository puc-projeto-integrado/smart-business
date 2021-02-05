<?php

namespace App\Http\Controllers\Api;

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
    private $tokenUrl = 'http://localhost/public/oauth/token';

    public function __construct(){
        $this->baseUrl = URL::to('/');
    }

    public function login(Request $request): JsonResponse
    {
        if (!$this->validate($request)) {
            return $this->sendHttpStatusCode(400, 'Invalid request.');
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $credentials = $this->getCredentials($request->email);

            if(!$credentials){
                return $this->sendHttpStatusCode(401, 'Unauthorized.');
            }

            $content = $this->getBearerToken($credentials['oauthClientId'], $credentials['secret'], $request->email, $request->password);
            $content = json_decode($content, false);
            $content->name = $credentials['name'];
            $content->id = $credentials['id'];
            return $this->sendHttpStatusCode(200, Null, $content);
        }
        return $this->sendHttpStatusCode(401, 'Unauthorized.');
    }

    private function validate(Request $request): bool
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        return !$validator->fails();
    }

    public function sendHttpStatusCode(int $status, $message = null, $body = null): JsonResponse
    {
        $params = ['status' => $status];
        if (!is_null($message)) {
            $params['message'] = $message;
        }
        if (!is_null($body)) {
            $params['body'] = $body;
        }
        return Response::json($params, $status);
    }

    private function getCredentials(string $email)
    {
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
                'id' => $result[0]->id
            ];
        }

        return null;
    }

    private function getBearerToken($oauthClientId, $secret, $email, $password): String
    {

        $client = new Client();

        try {
            $response = $client->post($this->tokenUrl, [
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

    private function clientExceptionHandler(ClientException $exception): JsonResponse
    {
        if ($exception->hasResponse() && $exception->getResponse()) {
            return $this->sendHttpStatusCode('ERROR', $exception->getResponse()->getStatusCode(), $exception->getResponse()->getReasonPhrase());
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
                $user->password = Hash::make($password);
                $user->role_id = 2;
                $user->save();

            } catch (QueryException $exception) {
                return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', $exception->getMessage());
            }

            $savedUser = User::where('email', '=', $email)->get();

            try {
                $oauthClient = new OauthClient();
                $oauthClient->name = $name;
                $oauthClient->secret = Hash::make($password);
                $oauthClient->password_client = $savedUser[0]->id;
                $oauthClient->redirect = $this->baseUrl;
                $oauthClient->personal_access_client = 0;
                $oauthClient->revoked = 0;

                $oauthClient->save();

            } catch (QueryException $exception) {
                return $this->sendHttpStatusCode(422, 'Unprocessable Entity.', $exception->getMessage());
            }
        });

        return $this->sendHttpStatusCode(200, 'Success', 'User saved');
    }
}
