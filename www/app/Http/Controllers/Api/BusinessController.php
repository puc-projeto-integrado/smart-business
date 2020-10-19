<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Business;
use DB;

class BusinessController extends Controller
{
    const FOO = 'FOO';

    private $defaultFields = [
        'businesses.id', 'businesses.name', 'businesses.cnpj', 'businesses.email', 'businesses.website', 'businesses.description', 'businesses.facebook_address', 'businesses.twitter_address', 'businesses.address', 'businesses.district', 'businesses.category_id', 'businesses.ip', 'businesses.newsletter', 'businesses.phone', 'businesses.highlight', 'businesses.created_at', 'categories.name as category_name', 'cities.id as city_id', 'cities.name as city_name'];

    function index(Request $request){
        $business = Business::where('highlight','!=','S')
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function show(Request $request, $id){
        $business = Business::where('businesses.id', $id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->get();
        return $this->jsonResponseinUtf8($business);
    }

    function byState(Request $request, $id){
        $business = Business::where('category_id',$id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function byCity(Request $request, $id){
        $business = Business::where('city_id',$id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function highlights(Request $request){
        $business = Business::where('highlight','S')
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }
}
