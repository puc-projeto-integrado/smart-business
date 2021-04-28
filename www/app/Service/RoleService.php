<?php

namespace App\Service;

use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleService{

    public function addRoleAndActions(Request $request){

        DB::transaction(function () use ($request) {
            $this->addRole($request);
            $this->addRoleActions($request);
        });
    }

    public function addRole(Request $request){
        try {

        } catch (QueryException | \Exception $e) {
            return $e->getMessage();
        }
    }

    public function addRoleActions(Request $request){

        $roleActions = $request->roleActions;

        try {

        } catch (QueryException | \Exception $e) {
            return $e->getMessage();
        }
    }
}
