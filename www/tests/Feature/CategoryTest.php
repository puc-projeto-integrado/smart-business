<?php

namespace Tests\Feature;

use App\Category;
use Illuminate\Database\Eloquent\Model;
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

    public function testCategory()
    {
        $response = $this->get('/api/category/');
        $response->assertStatus(200);
    }

    public function testCategoryDetail()
    {
        $response = $this->get('/api/category/1');
        $response->assertStatus(200);
    }

    public function testCategoryAdd(){
        $url = '/api/category/add';
        $response = $this->json('POST', $url);
        $response->assertStatus(401);

        $postContent = ['name'=>'Category Test'];
        $this->json('POST', $url, [], $this->fixture->getHeaders())->assertStatus(400);
        $this->withHeaders($this->fixture->getHeaders())->post($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->post($url, $postContent)->assertStatus(422);
    }

    public function testCategoryUpdate()
    {
        $url = '/api/category/update';
        $response = $this->put($url);
        $response->assertStatus(401);

        $postContent = [
            'id' => $this->fixture->getLastId(new Category()),
            'name'=>'Cat Test Updated',
        ];
        $this->withHeaders($this->fixture->getHeaders())->put($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->put($url, [])->assertStatus(400);
    }

    public function testUserDelete()
    {
        $url = '/api/category/delete';
        $response = $this->delete($url);
        $response->assertStatus(401);

        $postContent = ['id' => $this->fixture->getLastId(new Category())];

        $this->withHeaders($this->fixture->getHeaders())->delete($url, $postContent)->assertStatus(200);
        $this->withHeaders($this->fixture->getHeaders())->delete($url, [])->assertStatus(400);
    }
}
