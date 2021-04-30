<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Service\BusinessService;

class BusinessController extends Controller
{
    private $defaultFields = [
        'categories.name as category_name', 'businesses.id', 'businesses.name', 'businesses.cnpj', 'businesses.email', 'businesses.website', 'businesses.description', 'businesses.facebook_address', 'businesses.twitter_address', 'businesses.address', 'businesses.district', 'businesses.category_id', 'businesses.ip', 'businesses.newsletter', 'businesses.phone', 'businesses.highlight', 'businesses.created_at',  'cities.id as city_id', 'cities.name as city_name'];

    private function handleResponse($method){
        try{
            $business = $method();
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function index(Request $request){
        try{
            return $this->jsonResponseinUtf8(BusinessService::getBusiness());
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function show($id){
        try{
            $business = BusinessService::getBusinessById($id);
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function byState(BusinessService $businessService, $id){
        try{
            $business = $businessService::getBusinessByState($id);
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function byCity(BusinessService $businessService, $id){
        try{
            $business = $businessService::getBusinessByCity($id);
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function byUser($id){
        try{
            $business = BusinessService::getBusinessByUser($id);
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function byCategory($id){
        try{
            $business = BusinessService::getBusinessByCategory($id);
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function highlights(Request $request){
        try{
            $business = BusinessService::getBusinessHighlights();
            if($business){
                return $this->jsonResponseinUtf8($business);
            }
            return Response::json(['status'=>'failed', 'reason'=>'empty'], 204);
        }catch (QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function add(Request $request){
        try{
            $businessId = BusinessService::addBusiness($request);
            return Response::json(['status'=>200, 'message'=>'saved', 'id'=>$businessId], 200);
        }catch (QueryException | Exception $e){
            return Response::json(['message'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function delete(Request $request){
        abort_if(!$request->id, 400, "Bad request.");
        try {
            BusinessService::deleteBusiness($request);
            return Response::json(['status'=>200, 'message'=>'deleted'], 200);
        }catch(QueryException $e){
            return Response::json(['message'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function update(Request $request){
        abort_if(!$request->id, 400, "Bad request.");
        try {
            BusinessService::updateBusiness($request);
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }


}
