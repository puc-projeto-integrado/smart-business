<?php

namespace App\Http\Middleware;

use Closure;
use App\Service\PermissionsService;

class Permissions
{

    public function handle($request, Closure $next)
    {

        if(!PermissionsService::hasPermission($request->bearerToken(), $request->path())) {
            $message = ["message" => "Unauthorized access attempt."];
            return response($message, 401);
        }

        return $next($request);
    }
}


