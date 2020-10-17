<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Business;
use DB;

class BusinessController extends Controller
{

    private $fields = [
        'businesses.id', 'businesses.name', 'businesses.cnpj', 'businesses.email', 'businesses.website', 'businesses.description', 'businesses.facebook_address', 'businesses.twitter_address', 'businesses.address', 'businesses.district', 'businesses.category_id', 'businesses.ip', 'businesses.newsletter', 'businesses.phone', 'businesses.highlight', 'businesses.created_at', 'categories.name as category_name', 'cities.id as city_id', 'cities.name as city_name'];

    function index(Request $request){
        $sortCol = $request->input('sort', 'id');
        $business = Business::where('highlight','!=','S')
        ->select($this->fields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy($sortCol)->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function byState(Request $request, $id){
        $sortCol = $request->input('sort', 'id');
        $business = Business::where('category_id',$id)->orderBy($sortCol)->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function byCity(Request $request, $id){
        $sortCol = $request->input('sort', 'id');
        $business = Business::where('city_id',$id)->orderBy($sortCol)->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    function highlights(Request $request){
        $sortCol = $request->input('sort', 'businesses.id');

        $business = Business::where('highlight','S')
        ->select('businesses.*', 'categories.name as category_name', 'cities.id as city_id', 'cities.name as city_name')
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy($sortCol)->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }
}
