<?php

namespace App\Http\Controllers\Api;

use App\Service\StateService;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\State;
use Illuminate\Support\Facades\Response;

class StateController extends Controller
{
    function index(){
        return $this->jsonResponseinUtf8(StateService::getState());
    }

    function show(int $id){
        return $this->jsonResponseinUtf8(StateService::getStateById($id));
    }

    public function add(Request $request){
        try {
            StateService::addState($request);
        }catch (QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>200, 'message'=>'saved'], 200);
    }

    public function update(Request $request){
        abort_if(!$request->id, 400, 'Missing parameter.');

        try {
            StateService::updateState($request);
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>'success'], 200);
    }

    public function delete(Request $request){
        abort_if(!$request->id, 400, 'Missing parameter.');

        try {
            StateService::deleteState($request);
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>'success'], 200);
    }
}
