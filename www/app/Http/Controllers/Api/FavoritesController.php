<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FavoritesController extends Controller{

    public function show(int $id){
        $content = new \stdClass();
        $content->status = 'Ok';
        return $this->jsonResponseinUtf8($content);
    }

    public function add(Request $request){

        $userId = $request->userId;
        $businessItemId = $request->businessItemId;

        $content = new \stdClass();
        $content->status = 'O!';
        return $this->jsonResponseinUtf8($content);
    }
}
