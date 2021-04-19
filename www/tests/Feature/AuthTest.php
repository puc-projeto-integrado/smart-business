<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;
use App\State;
use App\Http\Controllers\Api\AuthController;

class AuthTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testLogin(){
        echo 'Test login...';
        $url = '/api/login';
        $postContent = [];
        $response = $this->post($url,$postContent);
        $response->assertStatus(400);

        //TODO Override getBearerToken() url with a optional url param in login()
    }

    public function testGetCredentials(){
        $auth = new AuthController();
        $credentials = $auth->getCredentials('gab@gab.com');
        $this->assertEquals(count($credentials),5);
    }

    public function testGetBearerToken(){
        $email = 'gab@gab.com';
        $password = '123';

        $auth = new AuthController();
        $credentials = $auth->getCredentials($email);

        $bearerToken = $auth->getBearerToken(
            $credentials['oauthClientId'],
            $credentials['secret'],
            $email,
            $password,
        'http://localhost/public/oauth/token');

        $this->assertEquals(count(json_decode($bearerToken, true)),4);
    }
}
