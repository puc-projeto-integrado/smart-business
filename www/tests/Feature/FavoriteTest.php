<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;

class FavoriteTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testFavoriteDetail()
    {
        $url = '/api/favorites/12';
        $response = $this->get($url);
        $response->assertStatus(401);

        $headers = $this->fixture->getHeaders();
        $postContent = [];

        $response = $this->withHeaders($headers)->get($url, $postContent);
        $response->assertStatus(200);
    }

    public function testFavoriteAdd()
    {
        $url = '/api/favorites/add';
        $response = $this->get($url);
        $response->assertStatus(401);

        $headers = $this->fixture->getHeaders();
        $postContent = ['user_id'=>1, 'business_id'=>6261];

        $response = $this->withHeaders($headers)->post($url, $postContent);
        $response->assertStatus(200);

        $response = $this->withHeaders($headers)->post($url, $postContent);
        $response->assertStatus(422);
    }

    public function testFavoriteDelete()
    {
        $url = '/api/favorites/delete';
        $response = $this->delete($url);
        $response->assertStatus(401);

        $headers = $this->fixture->getHeaders();

        $postContent = [];
        $response = $this->withHeaders($headers)->delete($url, $postContent);
        $response->assertStatus(400);

        $postContent = ['user_id'=>1, 'business_id'=>6261];
        $response = $this->withHeaders($headers)->delete($url, $postContent);
        $response->assertStatus(200);
    }

}
