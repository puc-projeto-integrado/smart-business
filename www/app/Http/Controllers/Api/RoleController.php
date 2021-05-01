<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\RoleService;
use Illuminate\Support\Facades\Response;

class RoleController extends Controller
{
    public function index(){
        return RoleService::getRoles();
    }

    public function show(int $id){
        return RoleService::getRoleById($id);
    }

    public function add(Request $request){
        try{
            RoleService::addRoleAndActions($request);
            return Response::json(['status'=>'success'], 200);
        }catch (Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function delete(Request $request){
        if (empty($request->id) || !isset($request->id)) {
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        try {
            $deleted = RoleService::deleteRole($request->id);
            if($deleted>0) {
                return Response::json(['status' => 'success'], 200);
            }else{
                return Response::json(['status' => 'Not found'], 204);
            }
        }catch (Exception $e){
            return Response::json(['status' => 'Unprocessable Entity', 'reason'=>$e->getMessage()], 422);
        }
    }

}
