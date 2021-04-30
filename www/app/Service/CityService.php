<?php
namespace App\Service;

use App\City;

class CityService{
    public static function getCity(){
        return City::all();
    }

    public static function getCityByState($id){
        return City::where('state_id', '=', $id)->get()->toArray();
    }
}
