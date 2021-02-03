<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FavoriteTest extends TestCase
{

    private static $base = '/api/favorites';

    public function testFavorites()
    {
        $response = $this->get($this::$base.'/6');
        $response->assertStatus(401);
    }

    public function testFavoritesAdd()
    {
        $response = $this->post($this::$base.'/add');
        $response->assertStatus(401);
    }

    public function testFavoritesDelete()
    {
        $response = $this->delete($this::$base.'/delete');
        $response->assertStatus(401);
    }
}
