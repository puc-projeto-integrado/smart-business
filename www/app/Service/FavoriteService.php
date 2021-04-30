<?php
namespace App\Service;

use App\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteService{

    public static function favoriteUser(int $userId){
        $fields = [
            'favorites.id as favorite_id',
            'cities.name as city_name',
            'states.name as state_name',
            'categories.name as category_name',
            'businesses.id as id',
            'businesses.name as name',
            'businesses.website as website',
            'businesses.phone as phone',
            'businesses.description as description',
        ];

        return DB::table('favorites')
            ->select($fields)
            ->where('favorites.user_id', '=', $userId)
            ->leftJoin('users', 'users.id', '=', 'favorites.user_id')
            ->leftJoin('businesses', 'businesses.id', '=', 'favorites.business_id')
            ->leftJoin('cities', 'businesses.city_id', '=', 'cities.id')
            ->leftJoin('states', 'cities.state_id', '=', 'states.id')
            ->leftJoin('categories', 'categories.id', '=', 'businesses.category_id')
            ->orderBy('favorites.id', 'desc')->get();
    }

    public static function favoriteExists(int $userId, int $businessId){
        return DB::table('favorites')
            ->select(['*'])
            ->where('user_id', '=', $userId)
            ->where('business_id', '=', $businessId)->get()->toArray();
    }

    public static function favoriteDelete(Request $request){
        $businessItemId = $request->business_id;

        return Favorite::where('user_id', $request->user_id)
            ->where('business_id', $businessItemId)
            ->forceDelete();
    }
}
