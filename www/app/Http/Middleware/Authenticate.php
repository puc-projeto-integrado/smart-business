<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next, ...$guards)
    {

        if (Auth::guard('api')->check()) {
            return $next($request);
        }

        $message = ["message" => "Permission Denied"];
        return response($message, 401);
        //return $next($request);
    }
//    public function handle($request, $next)
//    {

//    }
}
