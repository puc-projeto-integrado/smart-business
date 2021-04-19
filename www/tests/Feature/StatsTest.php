<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\Fixture;
use Tests\TestConstants;

class StatsTest extends TestCase
{
    private Fixture $fixture;

    public function setUp(): void
    {
        parent::setUp();
        $this->fixture = new Fixture();
    }

    public function testStatsCategory()
    {
        $response = $this->get('/api/stats/category');
        $response->assertStatus(200);
    }

    public function testStatsCity()
    {
        $response = $this->get('/api/stats/city');
        $response->assertStatus(200);
    }

    public function testStatsState()
    {
        $response = $this->get('/api/stats/state');
        $response->assertStatus(200);
    }

    public function testStatsFavorite()
    {
        $response = $this->get('/api/stats/favorite');
        $response->assertStatus(200);
    }

    public function testStatsRegister()
    {
        $response = $this->get('/api/stats/register');
        $response->assertStatus(200);
    }

}
