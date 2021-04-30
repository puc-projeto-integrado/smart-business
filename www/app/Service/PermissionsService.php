<?php
namespace App\Service;

use App\User;
use Doctrine\DBAL\Query\QueryException;

class PermissionsService{

    public static function hasPermission($bearerToken, $route) : Bool{
        $routes = PermissionsService::getPermissionsRoutes($bearerToken);
        return (PermissionsService::getUserRoleId($bearerToken)!==1 && !in_array($route, $routes)) ? False : True;
    }

    public static function getUserRoleId($bearerToken){
        $userId = PermissionsService::getUserId($bearerToken);
        $user = User::where('id', '=', $userId)->get();
        return $user[0]->role_id;
    }

    public static function getPermissionsRoutes($bearerToken){
        $permissions = PermissionsService::getUserPermissions($bearerToken);
        $routes = [];
        foreach ($permissions as $item){
            array_push($routes, $item->route);
        }
        return $routes;
    }

    public static function getUserPermissions($bearerToken){
        $id = PermissionsService::getUserId($bearerToken);

        try{
            $fields = [
                'role_actions.id',
                'role_actions.name',
                'role_actions.role_id',
                'role_actions.route'
            ];
            $permissions = User::where('users.id',$id)
                ->select($fields)
                ->join('roles', 'roles.id', '=', 'users.role_id')
                ->join('role_actions', 'role_actions.role_id', '=', 'roles.id')
                ->orderBy('roles.id', 'ASC')->get();
        }catch (QueryException | \Exception $e){
            return $e->getMessage();
        }

        return $permissions;

    }

    public static function getUserId($bearerToken){
        $user = PermissionsService::getUserDataFromToken($bearerToken);
        return $user->user_id;
    }

    public static function getUserDataFromToken($bearerToken){
        $tokenId = (new \Lcobucci\JWT\Parser())->parse($bearerToken)->getHeader('jti');
        return \Laravel\Passport\Token::find($tokenId)->client;
    }

}
