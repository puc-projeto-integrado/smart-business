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
        $fields = ['id', 'name', 'email', 'created_at'];
        $user = User::select($fields)
        ->where('role_id', '!=', 1)
        ->orderBy('created_at', 'desc')
        ->get();
        return $this->jsonResponseinUtf8($user);
    }

    public function detail($id){
        $fields = ['name', 'email', 'created_at'];
        $user = User::select($fields)
            ->where('id', '=', $id)
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
        $passUpdated = 'false';
        if(isset($request->password) && !empty($request->password)){
            $updateData['password'] = Hash::make($request->password);
            $passUpdated = 'true';
        }

        try {
            User::where('id', $userId)->update($updateData);
            return Response::json(['status'=>'success', 'passStatus'=>$passUpdated], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }

    }

    public function delete(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        try {
            User::where('id', $request->id)->forceDelete();
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

}
