<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Database\QueryException;
use App\User;
use App\Service\UserService;
use App\Service\PermissionsService;

class UserController extends Controller
{
    public function index(){
        return $this->jsonResponseinUtf8(UserService::getUsers());
    }

    public function show(int $id){
        return $this->jsonResponseinUtf8(UserService::getUserById($id));
    }

    public function update(Request $request)
    {
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        $update = UserService::updateUser($request);

        if($update['status']==1){
            return Response::json(['status'=>'success', 'passStatus'=>$update['passUpdated']], 200);
        }else{
            return Response::json(['status'=>'failed', 'reason'=>$update['passUpdated']], 422);
        }
    }

    public function delete(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }
        if(UserService::deleteUser($request->id)>0){
            return Response::json(['status'=>'success'], 200);
        }else{

        }

    }
}
