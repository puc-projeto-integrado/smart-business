<?php
namespace App\Service;

use App\Business;
use App\State;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Http\Request;
use App\Constants\BusinessConstants;

class BusinessService{

    public static function getBusinessByCity($id, $allData=Null){
        try{
            $business = Business::where('city_id',$id)
                ->select(BusinessConstants::getDefaultFields())
                ->join('cities', 'businesses.city_id', '=', 'cities.id')
                ->join('categories', 'businesses.category_id', '=', 'categories.id')
                ->orderBy('businesses.id', 'DESC');//->paginate(20);;
            if($allData){
                return $business->get();
            }else{
                return $business->paginate(20);
            }
        }catch (QueryException | Exception $e){
            return $e->getMessage();
        }
    }

    public static function getBusinessByState($id){
        try{
            $business = State::where('states.id',$id)
                ->select(BusinessConstants::getDefaultFields())
                ->join('cities', 'cities.state_id', '=', 'states.id')
                ->join('businesses', 'businesses.city_id', '=', 'cities.id')
                ->join('categories', 'businesses.category_id', '=', 'categories.id')
                ->orderBy('businesses.id', 'DESC')->paginate(20);
        }catch (QueryException | Exception $e){
            return $e->getMessage();
        }
        return $business;
    }

    public static function show($id){

    }

}
