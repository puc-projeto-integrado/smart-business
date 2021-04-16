<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;

class CategoryTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testUser()
    {
        $response = $this->get('/api/user/');
        $response->assertStatus(401);

        $response = $this->json(
            'GET',
            '/api/user/',
            [],
            ['Authorization' => 'Bearer '.$this->fixture->getToken()]
        );
        $response->assertStatus(200);
    }

    public function testUserDetail()
    {
        $response = $this->get('/api/user/1');
        $response->assertStatus(401);

        $response = $this->json(
            'GET',
            '/api/user/1',
            [],
            ['Authorization' => 'Bearer '.$this->fixture->getToken()]
        );
        $response->assertStatus(200);

        $content = json_decode($response->content(), false);
        $this->assertEquals(3, count((array)$content[0]));
    }

    public function testUserUpdate()
    {
        $response = $this->get('/api/user/update');
        $response->assertStatus(401);
    }

    public function testUserDelete()
    {
        $response = $this->get('/api/user/delete');
        $response->assertStatus(401);
    }
}
