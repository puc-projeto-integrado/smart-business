<?php
namespace App\Service;

use App\Constants\BusinessConstants;
use App\User;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class UserService{

    public static function getUsers(){
        $fields = ['id', 'name', 'email', 'created_at'];
        return User::select($fields)
            ->where('role_id', '!=', 1)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public static function getUserById(int $id){
        $fields = ['name', 'email', 'created_at'];
        return User::select($fields)
            ->where('id', '=', $id)
            ->get();
    }

    public static function getUsersByRoleId(int $id){
        $fields = ['name', 'email', 'created_at'];
        return User::select($fields)
            ->where('role_id', '=', $id)
            ->get();
    }

    public static function updateUser(Request $request){
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
            return ['status'=>1, 'passUpdated' => $passUpdated];
        }catch(\Illuminate\Database\QueryException $e){
            return ['status'=>0, 'reason' => $e->getMessage()];
        }
    }

    public static function deleteUser(int $id){
        return User::where('id', $id)->forceDelete();
    }

}
