<?php
namespace App\Service;

use App\RoleAction;

class RoleActionService{
    public static function getRoleActionsByRoleId(int $id){
        return RoleAction::where('role_id', '=', $id)->get();
    }
}
