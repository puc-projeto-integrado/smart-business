<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiTest extends TestCase
{

    private static $base = '/api';

    public function testFavorites()
    {
        $response = $this->post($this::$base.'/login');
        $response->assertStatus(400);
    }
}
