<?php

namespace Tests\Feature;

use App\Business;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;
use GuzzleHttp\RequestOptions;

class BusinessTest extends TestCase
{
    private static $base = '/api/business';
    private string $baseUrl;
    private string $tokenUrl;
    private Fixture $testHelper;

    public function setUp(): void
    {
        parent::setUp();
        $this->testHelper = new Fixture();
    }

    public function testBusiness()
    {
        $response = $this->json('GET', $this::$base);
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => 6255]);
        $response->assertJsonFragment(['email' => 'contato.controlvettor@gmail.com']);
        $response->assertJsonFragment(['current_page' => 1]);
    }

    public function testBusinessHighlights()
    {
        $response = $this->json('GET', $this::$base.'/highlight');
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => 202]);
        $response->assertJsonFragment(['email' => 'contato@agenciapulse.com.br']);
        $response->assertJsonFragment(['current_page' => 1]);
    }

    public function testBusinessDetail()
    {
        $response = $this->json('GET', $this::$base.'/198');
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => 198]);
        $response->assertJsonFragment(['email' => 'mroliver@mroliver.com.br']);

        $response = $this->json('GET',$this::$base.'/199');
        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => 199]);
        $response->assertJsonFragment(['email' => 'fernanda@poppymidia.com.br']);
    }

    public function testBusinessByState()
    {
        $categoryId = 2;
        $response = $this->json('GET', $this::$base.'/state/'.$categoryId);
        $response->assertStatus(200);
        $response->assertJsonFragment(['email' => 'flvtransporte@hotmail.com']);
        $response->assertJsonFragment(['category_id' => $categoryId]);
        $response->assertJsonFragment(['current_page' => 1]);
    }

    public function testBusinessByCity()
    {
        $cityId = 237;
        $response = $this->json('GET', $this::$base.'/city/'.$cityId);
        $response->assertStatus(200);
        $response->assertJsonFragment(['city_id' => $cityId]);
        $response->assertJsonFragment(['current_page' => 1]);
    }

    public function testBusinessByCategory()
    {
        $categoryId = 5;
        $response = $this->json('GET', $this::$base.'/category/'.$categoryId);
        $response->assertStatus(200);
    }

    public function testBusinessAdd()
    {
        $url = $this::$base . '/add';
        $response = $this->json('POST', $url);
        $response->assertStatus(401);

        $postContent = [
            'user_id'=>1,
            'name'=>'Foo Test',
            'description'=>'Test description',
            'city_id'=>456,
            'category_id'=>5
        ];
        $headers = ['Authorization' => 'Bearer '.$this->testHelper->getToken(),];

        $this->json('POST', $url, [], $headers)->assertStatus(422);
        $response = $this->withHeaders($headers)->post($url, $postContent);
        $response->assertStatus(200);
    }

    public function testBusinessUpdate()
    {
        $url = $this::$base . '/update';
        $this->json('PUT', $url)->assertStatus(401);

        $headers = [
            'Authorization' => 'Bearer '.$this->testHelper->getToken(),
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        $lastId = Business::orderBy('id', 'DESC')->first();

        $postContent = [
            'id' => $lastId->id,
            'name'=>'Foo Test Updated',
            'description'=>'Test description Updated',
            'city_id'=>456,
            'category_id'=>5
        ];
        $this->withHeaders($headers)->put($url, $postContent)->assertStatus(200);
        $this->withHeaders($headers)->put($url, [])->assertStatus(400);
    }

    public function testBusinessDelete()
    {
        $url = $this::$base . '/delete';
        $response = $this->json('DELETE', $url);
        $response->assertStatus(401);

        $headers = [
            'Authorization' => 'Bearer '.$this->testHelper->getToken(),
            'Content-Type' => 'application/x-www-form-urlencoded'
        ];

        $lastInsertedId = Business::orderBy('id', 'DESC')->first();
        $postContent = ['id' => $lastInsertedId->id];

        $this->withHeaders($headers)->delete($url, $postContent)->assertStatus(200);
        $this->withHeaders($headers)->delete($url, [])->assertStatus(400);
    }

    public function testBusinessByUserReturns401()
    {
        $response = $this->get($this::$base.'/user/1');
        $response->assertStatus(401);
    }

    public function testBusinessByUserReturns200()
    {
        $response = $this->json(
            'GET',
            '/api/business/user/6',
            [],
            ['Authorization' => 'Bearer '.$this->testHelper->getToken()]
        );
        $response->assertStatus(200);
    }

    public function testBusinessByUserReturns204()
    {
        $response = $this->json(
            'GET',
            '/api/business/user/0',
            [],
            ['Authorization' => 'Bearer '.$this->testHelper->getToken()]
        );
        $response->assertStatus(204);
    }

}
