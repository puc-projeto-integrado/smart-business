<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{

    public function byCategory(){
        $business = Business::select(DB::raw('categories.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('categories', 'categories.id', '=', 'businesses.category_id')
            ->groupBy('businesses.category_id')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
        return $this->jsonResponseinUtf8($business);
    }

    public function byCity(){
        $business = Business::select(DB::raw('cities.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('cities', 'cities.id', '=', 'businesses.city_id')
            ->groupBy('cities.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
        return $this->jsonResponseinUtf8($business);
    }

    public function byState(){
        $business = Business::select(DB::raw('states.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('cities', 'cities.id', '=', 'businesses.city_id')
            ->leftjoin('states', 'cities.state_id', '=', 'states.id')
            ->groupBy('states.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
        return $this->jsonResponseinUtf8($business);
    }

    public function byFavorite(){
        $business = Business::select(DB::raw('businesses.name, count(favorites.business_id) as num_registers'))
            ->from('businesses')
            ->leftjoin('favorites', 'favorites.business_id', '=', 'businesses.id')
            ->groupBy('businesses.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
        return $this->jsonResponseinUtf8($business);
    }
}
