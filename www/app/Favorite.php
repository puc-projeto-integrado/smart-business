<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Favorite extends Model
{
    public function favoritesFromUser(int $userId){
        $favorites = DB::table('favorites')->select(DB::raw(Constants::DEFAULT_DATE_FORMAT))
            //->where(CommonConstants::LABEL_ATIVO, $operator, 'N')
            ->leftJoin('users', 'users.email', '=', 'associado.email')
            ->where('role_id', '!=', '1')
            ->where('ativo', $operator, 'N')
            ->orderBy('id', 'desc');
    }
}
