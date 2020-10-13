<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\City;

class CityController extends Controller
{
    function index(){
        return City::all();
    }
}
