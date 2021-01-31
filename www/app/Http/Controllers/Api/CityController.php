<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\City;

class CityController extends Controller
{
    public function index(){
        return City::all();
    }

    public function citiesByState(int $id){
        $cities = City::where('state_id', '=', $id)->get()->toArray();
        return $this->jsonResponseinUtf8($cities);
    }
}
