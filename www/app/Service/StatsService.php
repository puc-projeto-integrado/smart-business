<?php
namespace App\Service;

use App\Business;
use Illuminate\Support\Facades\DB;

class StatsService{

    public static function getStatsByCateogry(){
        return Business::select(DB::raw('categories.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('categories', 'categories.id', '=', 'businesses.category_id')
            ->groupBy('businesses.category_id')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
    }

    public static function getStatsByCity(){
        return Business::select(DB::raw('cities.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('cities', 'cities.id', '=', 'businesses.city_id')
            ->groupBy('cities.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
    }

    public static function getStatsByState(){
        return Business::select(DB::raw('states.name, count(businesses.id) as num_registers'))
            ->from('businesses')
            ->leftjoin('cities', 'cities.id', '=', 'businesses.city_id')
            ->leftjoin('states', 'cities.state_id', '=', 'states.id')
            ->groupBy('states.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
    }

    public static function getStatsByFavorite(){
        return Business::select(DB::raw('businesses.name, count(favorites.business_id) as num_registers'))
            ->from('businesses')
            ->leftjoin('favorites', 'favorites.business_id', '=', 'businesses.id')
            ->groupBy('businesses.name')
            ->orderBy('num_registers', 'desc')
            ->limit(5)
            ->get();
    }

    public static function getStatsByRegisters(){
        return Business::select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month ,COUNT(*) as total'))
            ->from('businesses')
            ->groupBy('year', 'month')
            ->get();
    }
}
