<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\State;

class StateController extends Controller
{
    function index(){

        $states = State::all();
        return $this->jsonResponseinUtf8($states);
    }

    function show(int $id){
        
    }
}
