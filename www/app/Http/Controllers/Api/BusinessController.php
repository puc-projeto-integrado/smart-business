<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

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
            return Response::json(['status'=>'saved'], 200);

        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function byUser(int $id){
        $result = Business::where('user_id', $id)->orderBy('created_at')->first();
        return $this->jsonResponseinUtf8($result);
    }

}
