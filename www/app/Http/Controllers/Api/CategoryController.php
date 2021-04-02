<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Response;

class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }

    public function update(){
        return Category::all();
    }

    public function delete(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        try {
            Category::where('id', $request->id)->forceDelete();
            return Response::json(['status'=>'success', 'id'=>$request->id], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

}
