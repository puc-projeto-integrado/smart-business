<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Favorite extends Model
{
    public function favoritesFromUser(int $userId){
        $favorites = DB::table('favorites')->select(DB::raw('*, users.id as user_id'))
            ->where('user_id', '=', '1')
            ->leftJoin('users', 'users.id', '=', 'favorites.user_id')
            ->orderBy('favorites.id', 'desc')->get();
            return $favorites;
    }
}
