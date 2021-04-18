<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;

class UserTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testUser()
    {
        $url = '/api/user/';
        $response = $this->get($url);
        $response->assertStatus(401);

        $response = $this->withHeaders($this->fixture->getHeaders())->get($url, []);
        $response->assertStatus(200);
    }

    public function testUserDetail()
    {
        $url = '/api/user/1';
        $response = $this->get($url);
        $response->assertStatus(401);

        $response = $this->withHeaders($this->fixture->getHeaders())->get($url, []);
        $response->assertStatus(200);

        $content = json_decode($response->content(), false);
        $this->assertEquals(3, count((array)$content[0]));
    }

    public function testUserAdd(){
        $url = '/api/user/add';
        $response = $this->post($url);
        $response->assertStatus(401);

        $postContent = [
            'name' => 'Test User',
            'email' => 'testuser@email.com',
            'password' => Hash::make('test'),
            'role_id' => 2
        ];

        $this->withHeaders($this->fixture->getHeaders())->put($url, $postContent)->assertStatus(200);

    }

    public function testUserUpdate()
    {
        $url = '/api/user/update';
        $response = $this->put($url);
        $response->assertStatus(401);

        $postContent = [
            'id' => 3,
            'name'=>'User Test Updated',
            'email'=>'test_email@email.com'
        ];
        $this->withHeaders($this->fixture->getHeaders())->put($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->put($url, [])->assertStatus(400);

    }

    public function testUserDelete()
    {
        $response = $this->get('/api/user/delete');
        $response->assertStatus(401);
    }
}
