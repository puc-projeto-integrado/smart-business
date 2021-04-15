<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\State;
use Illuminate\Support\Facades\Response;

class StateController extends Controller
{
    function index(){
        $states = State::all();
        return $this->jsonResponseinUtf8($states);
    }

    function show(int $id){
        $state = State::where('id', '=', $id)->get();
        return $this->jsonResponseinUtf8($state);
    }

    public function add(Request $request){

        $state = new State;
        $exceptionalFields = ['id'];

        foreach ($_POST as $key => $value) {
            if (!in_array($key, $exceptionalFields, true))
                $state->$key = $value;
        }

        try{
            $state->save();
            return Response::json(['status'=>200, 'message'=>'saved'], 200);
        }catch (QueryException | Exception $e){
            return Response::json(['message'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function update(Request $request)
    {
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        $updateData = [];
        $updateData["id"] = $request->id;

        foreach ($request->request as $key => $value) {
            $updateData[$key] = $value;
        }

        try {
            State::where('id', $request->id)->update($updateData);
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException | Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }
}
