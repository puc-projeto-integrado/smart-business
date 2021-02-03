<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BusinessTest extends TestCase
{

    private static $base = '/api/business';

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

    public function testBusinessDetail()
    {
        $response = $this->get($this::$base.'/2');
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
    }
}
