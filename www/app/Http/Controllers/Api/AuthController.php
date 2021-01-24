<?php

namespace App\Http\Controllers\Api;

use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class AuthController
{

    const URL_TOKEN = 'http://localhost/public/oauth/token';

    public function foo()
    {
        return $this->sendHttpStatusCode(400, 'Invalid request.');
    }

    public function login(Request $request): JsonResponse
    {
        if (!$this->validate($request)) {
            return $this->sendHttpStatusCode(400, 'Invalid request.');
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $credentials = $this->getCredentials($request->email);
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

    private function sendHttpStatusCode(int $status, $message = null, $body = null): JsonResponse
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
            return $this->sendHttpStatusCode(422, 'Invalid query.');
        }
        return [
            'oauthClientId' => $result[0]->oauth_client_id,
            'secret' => $result[0]->secret,
            'name' => $result[0]->name,
            'id' => $result[0]->id
        ];
    }

    private function getBearerToken($oauthClientId, $secret, $email, $password): String
    {
        $client = new Client();

        try {
            $response = $client->post($this::URL_TOKEN, [
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
}
