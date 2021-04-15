<?php

namespace Tests\Feature;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\Api\AuthController;

class BusinessTest extends TestCase
{

    private static $base = '/api/business';
    private static $adminEmail = 'gab@gab.com';
    private static $adminPassword = '123';
    private string $baseUrl;
    private string $tokenUrl;


    public function testBusiness()
    {
        $response = $this->get($this::$base);
        $response->assertStatus(200);
    }

    public function testBusinessHighlights()
    {
        $response = $this->get($this::$base.'/highlight');
        $response->assertStatus(200);
    }

    public function testBusinessByState()
    {
        $response = $this->get($this::$base.'/state/2');
        $response->assertStatus(200);
    }

    public function testBusinessByCity()
    {
        $response = $this->get($this::$base.'/city/247');
        $response->assertStatus(200);
    }

    public function testBusinessByCategory()
    {
        $response = $this->get($this::$base.'/category/5');
        $response->assertStatus(200);
    }

    public function testBusinessByUser()
    {
        $response = $this->get($this::$base.'/user/6');
        $response->assertStatus(401);

        $bearerToken = $this->getToken();
        $response = $this->json('GET', '/api/user/1', [], ['Authorization' => 'Bearer '.$bearerToken]);
        $response->assertStatus(200);

        $content = json_decode($response->content(), false);
        $this->assertEquals(3, count((array)$content[0]));

    }

    public function getToken(){
        $client = new Client();
        $this->tokenUrl = URL::to('/').'/public/api/login';
        $response = $client->post($this->tokenUrl, [
            'form_params' => [
                'email' => $this::$adminEmail,
                'password' => $this::$adminPassword
            ]
        ]);
        $content = $response->getBody();
        $content = json_decode($content->getContents(), false);
        return $content->body->access_token;
    }
}
