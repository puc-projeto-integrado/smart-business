<?php

namespace App\Http\Controllers\Api;

use App\Business;
use Exception;
use Doctrine\DBAL\Query\QueryException;
use App\Http\Controllers\Controller;
use App\Service\FavoriteService;
use Illuminate\Http\Request;
use App\Favorite;
use Illuminate\Support\Facades\Response;

class FavoriteController extends Controller{

    public function show(int $userId){
        $favoritesUser = FavoriteService::favoriteUser($userId);
        $content = ["data" => $favoritesUser];
        return $this->jsonResponseinUtf8($content);
    }

    public function add(Request $request){
        $userId = $request->user_id;
        $businessItemId = $request->business_id;

        abort_if(count(FavoriteService::favoriteExists($userId, $businessItemId)), 422, 'Already exists.');

        $favorite = new Favorite;
        $favorite->user_id = $userId;
        $favorite->business_id = $businessItemId;
        $favorite->save();
        return Response::json(['status'=>'saved'], 200);
    }

    public function delete(Request $request){
        abort_if(!$request->user_id, 400, "Bad request.");

        try{
            $affectedRows = FavoriteService::favoriteDelete($request);
        }catch (QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>$request->business_id], 200);
    }
}
