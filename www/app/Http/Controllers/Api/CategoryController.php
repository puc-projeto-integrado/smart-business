<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Category;

class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }

}
