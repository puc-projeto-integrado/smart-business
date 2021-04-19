<?php

namespace Tests\Feature;

use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;
use App\State;

class StateTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testState()
    {
        $response = $this->get('/api/state/');
        $response->assertStatus(200);
    }

    public function testStateDetail()
    {
        $response = $this->get('/api/state/5');
        $response->assertStatus(200);
    }

    public function testStateAdd()
    {
        $url = '/api/state/add';
        $response = $this->post($url);
        $response->assertStatus(401);

        $postContent = ['name'=>'State Test'];
        $this->withHeaders($this->fixture->getHeaders())->post($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->post($url, ['foo'=>'foo'])->assertStatus(422);
    }

    public function testStateUpdate()
    {
        $url = '/api/state/update';
        $response = $this->put($url);
        $response->assertStatus(401);
        $lastId = $this->fixture->getLastId(new State());
        $postContent = [
            'id' => $lastId,
            'name'=>'State Test Updated',
        ];
        $this->withHeaders($this->fixture->getHeaders())->put($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->put($url, [])->assertStatus(400);
        $this->withHeaders($this->fixture->getHeaders())->put($url, ['id'=>$lastId, 'foo'=>'foo'])->assertStatus(422);
    }

    public function testStateDelete()
    {
        $url = '/api/state/delete';
        $response = $this->delete($url);
        $response->assertStatus(401);

        $headers = $this->fixture->getHeaders();
        $lastInsertedId = $this->fixture->getLastId(new State());
        $postContent = ['id' => $lastInsertedId];

        $this->withHeaders($headers)->delete($url, $postContent)->assertStatus(200);
        $this->withHeaders($headers)->delete($url, [])->assertStatus(400);
    }
}
