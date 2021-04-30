<?php
namespace App\Service;

use App\Business;
use App\State;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Http\Request;
use App\Constants\BusinessConstants;

class BusinessService{

    public static function getBusiness(){
        return Business::where('highlight','!=','S')
                ->select(BusinessConstants::getDefaultFields())
                ->join('cities', 'businesses.city_id', '=', 'cities.id')
                ->join('categories', 'businesses.category_id', '=', 'categories.id')
                ->orderBy('businesses.id', 'DESC')->paginate(20);
    }

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

    public static function getBusinessByState($id, $allData=True){
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

    public static function getBusinessById($id){
        return Business::where('businesses.id', $id)
            ->select(BusinessConstants::getDefaultFields())
            ->join('cities', 'businesses.city_id', '=', 'cities.id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->get();
    }

    public static function getBusinessByUser($id){
        return Business::where('user_id', $id)
            ->select(BusinessConstants::getDefaultFields())
            ->join('cities', 'businesses.city_id', '=', 'cities.id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->orderBy('created_at')->first();
    }

    public static function getBusinessByCategory($id){
        return Business::where('category_id', $id)
            ->select(BusinessConstants::getDefaultFields())
            ->join('cities', 'businesses.city_id', '=', 'cities.id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->orderBy('businesses.id', 'DESC')->paginate(40);
    }

    public static function getBusinessHighlights(){
        return Business::where('highlight','S')
            ->select(BusinessConstants::getDefaultFields())
            ->join('cities', 'businesses.city_id', '=', 'cities.id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->orderBy('businesses.id', 'DESC')->paginate(20);
    }

    public static function addBusiness(Request $request){
        $business = new Business;
        $exceptionalFields = ['id'];
        foreach ($request->request as $key => $value) {
            if (!in_array($key, $exceptionalFields, true))
                $business->$key = $value;
        }
        $business->save();
        return $business->id;
    }

    public static function deleteBusiness(Request $request){
        return Business::where('id', $request->id)
            ->forceDelete();
    }

    public static function updateBusiness(Request $request){
        $updateData = [];
        $updateData["id"] = $request->id;

        foreach ($request->request as $key => $value) {
            $updateData[$key] = $value;
        }
        return Business::where('id', $request->id)->update($updateData);
    }
}
