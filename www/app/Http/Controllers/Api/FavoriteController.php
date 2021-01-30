<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use App\Favorite;
use Illuminate\Support\Facades\Response;

class FavoriteController extends Controller{

    public function show(int $userId){
        $favoritesUser = Favorite::favoritesUser($userId);
        $content = ["data" => $favoritesUser];
        return $this->jsonResponseinUtf8($content);
    }

    public function add(Request $request){

        $userId = $request->user_id;
        $businessItemId = $request->business_id;

        $favoriteExists = Favorite::favoriteExists($userId, $businessItemId);

        if(count($favoriteExists)){
            return Response::json([], 422);
        }

        $favorite = new Favorite;
        $favorite->user_id = $userId;
        $favorite->business_id = $businessItemId;
        $favorite->save();

        return Response::json(['status'=>'saved'], 200);
    }

    public function delete(Request $request){

        $userId = $request->user_id;
        $businessItemId = $request->business_id;
        try {
            Favorite::where('user_id', $userId)
                ->where('business_id', $businessItemId)
                ->forceDelete();
            return Response::json(['status'=>'deleteds'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }

    }
}