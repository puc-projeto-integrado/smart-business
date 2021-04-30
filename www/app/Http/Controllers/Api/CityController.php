<?php

namespace App\Http\Controllers\Api;

use App\Service\CityService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\City;

class CityController extends Controller
{
    public function index(){
        return CityService::getCity();
    }

    public function citiesByState(int $id, $onlyWithBusiness=Null){
        return CityService::getCityByState($id);
    }
}
