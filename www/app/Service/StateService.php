<?php
namespace App\Service;

use App\State;
use Illuminate\Http\Request;

class StateService{

    public static function getState(){
        return State::all();
    }

    public static function getStateById($id){
        return State::where('id', '=', $id)->get();
    }

    public static function addState(Request $request){
        $state = new State;
        $exceptionalFields = ['id'];

        foreach ($request->request as $key => $value) {
            if (!in_array($key, $exceptionalFields, true))
                $state->$key = $value;
        }
        $state->save();
    }

    public static function updateState(Request $request){
        $updateData = [];
        $updateData["id"] = $request->id;

        foreach ($request->request as $key => $value) {
            $updateData[$key] = $value;
        }
        return State::where('id', $request->id)->update($updateData);
    }

    public static function deleteState(Request $request){
        return State::where('id', $request->id)->forceDelete();
    }
}
