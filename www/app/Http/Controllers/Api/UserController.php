<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Database\QueryException;
use App\User;

class UserController extends Controller
{
    public function index(){
        $fields = ['name', 'email', 'created_at'];
        $user = User::select($fields)
        ->where('role_id', '!=', 1)
        ->orderBy('created_at', 'desc')
        ->get();
        return $this->jsonResponseinUtf8($user);
    }

    public function update(Request $request)
    {
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }
        $userId = $request->id;
        $updateData['name'] = $request->name;
        $updateData['email'] = $request->email;

        if(isset($request->password) && !empty($request->passwordid)){
            $updateData['password'] = Hash::make($request->password);
        }

        try {
            User::where('id', $userId)->update($updateData);
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }

    }

    public function delete(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        $userId = $request->user_id;

        try {
            User::where('id', $userId)->forceDelete();
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

}
