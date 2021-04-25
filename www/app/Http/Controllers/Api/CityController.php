<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\City;

class CityController extends Controller
{
    public function index(){
        return City::all();
    }

    /*
        select s.id, s.uf, s.name, c.name
        from states s, cities c, businesses b
        where c.id = b.city_id
        and s.id = c.state_id
        and s.id = 5
        group by s.id, c.name;
     */

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

    public function citiesByState(int $id, $onlyWithBusiness=Null){
//        $cities = City::where('state_id', '=', $id)->get()->toArray();
        $cities = City::where('id', $id)
            ->select('*')
            ->join('business', 'states.id', '=', 'cities.state_id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->orderBy('businesses.id', 'DESC')->paginate(40);



        return $this->jsonResponseinUtf8($cities);
    }
}
