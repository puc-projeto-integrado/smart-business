<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;

class CityTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testCity()
    {
        $this->get('/api/city/')->assertStatus(200);
    }
    public function testCityByState()
    {
        $this->get('/api/city/state/19')->assertStatus(200);
    }

//    public function testCityDetail()
//    {
//        $this->get('/api/city/207')->assertStatus(200);
//    }
//
//    public function testCityAdd()
//    {
//        $response = $this->get('/api/city/add');
//        $response->assertStatus(401);
//    }
//
//    public function testCityUpdate()
//    {
//        $response = $this->get('/api/city/update');
//        $response->assertStatus(401);
//    }
//
//    public function testCityrDelete()
//    {
//        $response = $this->get('/api/city/delete');
//        $response->assertStatus(401);
//    }
}
