<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\RoleActionService;

class RoleActionController extends Controller
{
    public function byRoleId(int $id){
        return RoleActionService::getRoleActionsByRoleId($id);
    }
}
