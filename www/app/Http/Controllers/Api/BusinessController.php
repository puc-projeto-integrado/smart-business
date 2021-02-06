<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Api\AuthController;

class BusinessController extends Controller
{

    private $defaultFields = [
        'businesses.id', 'businesses.name', 'businesses.cnpj', 'businesses.email', 'businesses.website', 'businesses.description', 'businesses.facebook_address', 'businesses.twitter_address', 'businesses.address', 'businesses.district', 'businesses.category_id', 'businesses.ip', 'businesses.newsletter', 'businesses.phone', 'businesses.highlight', 'businesses.created_at', 'categories.name as category_name', 'cities.id as city_id', 'cities.name as city_name'];

    public function index(Request $request){
        $business = Business::where('highlight','!=','S')
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    public function show(Request $request, $id){
        $business = Business::where('businesses.id', $id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->get();
        return $this->jsonResponseinUtf8($business);
    }

    public function byState(Request $request, $id){
        $business = Business::where('category_id',$id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    public function byCity(Request $request, $id){
        $business = Business::where('city_id',$id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    public function byUser($id){
        $result = Business::where('user_id', $id)
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('created_at')->first();

        if($result){
            return $this->jsonResponseinUtf8($result);
        }

        return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);

    }

    public function byCategory($id){

        $result = Business::where('category_id', $id)
            ->select($this->defaultFields)
            ->join('cities', 'businesses.city_id', '=', 'cities.id')
            ->join('categories', 'businesses.category_id', '=', 'categories.id')
            ->orderBy('businesses.id', 'DESC')->paginate(40);

        return $this->jsonResponseinUtf8($result);
    }

    public function foo($id){
        return $id;
    }

    public function highlights(Request $request){
        $business = Business::where('highlight','S')
        ->select($this->defaultFields)
        ->join('cities', 'businesses.city_id', '=', 'cities.id')
        ->join('categories', 'businesses.category_id', '=', 'categories.id')
        ->orderBy('businesses.id', 'DESC')->paginate(20);
        return $this->jsonResponseinUtf8($business);
    }

    public function add(Request $request){

        $business = new Business;
        $exceptionalFields = ['id'];

        foreach ($_POST as $key => $value) {
            if (!in_array($key, $exceptionalFields, true)) {
                $business->$key = $value;
            }
        }

        try{
            $business->save();
            return Response::json(['message'=>'saved'], 200);

        }catch (QueryException | Exception $e){
            //return Response::json(['status'=>'saved'], 200);
            return Response::json(['message'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function delete(Request $request){
        $userId = $request->user_id;
        $businessItemId = $request->business_id;
        try {
            Business::where('user_id', $userId)
                ->where('id', $businessItemId)
                ->forceDelete();
            return Response::json(['message'=>'deleted'], 200);
        }catch(QueryException $e){
            return Response::json(['message'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }



}
