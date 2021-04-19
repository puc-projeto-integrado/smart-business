<?php

namespace Tests;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\URL;
use Tests\TestConstants;

class Fixture{

    private TestConstants $constants;
    private string $tokenUrl;

    public function __construct(){
        $this->constants  = new TestConstants();
    }

    public function getLastId($entity){
        return $entity::orderBy('id', 'DESC')->first()->id;
    }

    public function getHeaders(){
        return [
            'Authorization' => 'Bearer '.$this->getToken(),
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];
    }

    public function getToken(){
        $client = new Client();
        $this->tokenUrl = URL::to('/').'/public/api/login';
        $response = $client->post($this->tokenUrl, [
            'form_params' => [
                'email' => $this->constants::adminEmail,
                'password' => $this->constants::adminPassword
            ]
        ]);

        $content = $response->getBody();
        $content = json_decode($content->getContents(), false);
//        var_dump($content->message->access_token);
        return $content->body->access_token;
//        return $content->message->access_token;
    }
}
