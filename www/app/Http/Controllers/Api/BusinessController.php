<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Business;

class BusinessController extends Controller
{
    function index(Request $request){
        $sortCol = $request->input('sort', 'id');
        $business = Business::orderBy($sortCol)->paginate(20);
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
}
