<?php

namespace App\Service;

use Exception;
use App\RoleAction;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use App\Role;

class RoleService{

    public static function addRoleAndActions(Request $request){
        DB::beginTransaction();
        $requestObj = json_decode($request->getContent(), false);

        try {
            $roleId = RoleService::addRole($requestObj);
            RoleService::addRoleActions($requestObj, $roleId);
            DB::commit();
        }catch (QueryException | Exception $e){
            DB::rollBack();
            Throw new Exception($e->getMessage());
        }
    }

    public static function addRole(\stdClass $request){
        $role = new Role;
        $role->name = $request->role_name;
        $role->save();
        return $role->id;
    }

    public static function addRoleActions(\stdClass $request, int $roleId){
        $roleActionsList = [];
        foreach ($request->roleActions as $row) {
            $rowTemp = ["role_id" => $roleId];
            foreach ($row as $key => $value) {
                $rowTemp[$key] = $value;
            }
            array_push($roleActionsList, $rowTemp);
        }
        RoleAction::insert($roleActionsList);
    }

    public static function deleteRole(int $id){
        if($id==1 || $id==2){
            throw new Exception('Role cannot be deleted.');
        }
        return Role::where('id', $id)->forceDelete();
    }

    public static function getRoles(){
        return Role::where('id', '>', '2')
            ->get();
    }

    public static function getRoleById($id){
        return Role::where('id', '=', $id)->get();
    }


}
