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
        $response = $this->get($this::$base.'/623');
        $strut = [
            "id",
            "name"=>"HPED Marcenaria",
            "cnpj"=>"19.387.313\/0001-72",
            "email"=>"hpedmoveis@hotmail.com",
            "website"=>"www.hpedmoveis.com.br",
            "description"=>"Prezados",
            "twitter_address"=>"",
            "address"=>"Rua Lagoa Seca",
            "district"=>"Presidente Dutra",
            "category_id"=>18,
            "ip"=>"177.32.142.149",
            "newsletter"=>"S",
            "phone"=>"11 3487-3150",
            "highlight"=>"",
            "created_at"=>"2014-01-26 13:08:02",
            "category_name"=>"Móveis e Modulados",
            "city_id"=>1134,
            "city_name"=>"Sao Paulo"];

        $obj = new \stdClass();
//        $obj->id=623;
//        $obj->highlight='';
        $obj->address = 'Rua Lagoa Seca, 491';
        $data = [$obj];

        $response->assertStatus(200)
            ->assertJsonFragment($data);
        $response->assertJsonStructure([]);
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
