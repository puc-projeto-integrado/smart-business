<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Response;
use App\Service\CategoryService;

class CategoryController extends Controller
{
    public function index(){
        return CategoryService::getCategories();
    }

    public function show($id){
        try{
            $category = CategoryService::getCategoryById($id);
            if(!$category){ abort(204, 'Not found');}
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return $this->jsonResponseinUtf8($category);
    }

    public function add(Request $request){
        abort_if(!$request->name, 400, "Bad request.");

        try {
            CategoryService::addCategory($request->name);
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>'success', 'id'=>$request->id], 200);
    }

    public function update(Request $request){
        abort_if(!$request->id, 400, "Bad request.");

        try {
            CategoryService::updateCategory($request);
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }
        return Response::json(['status'=>'success'], 200);
    }

    public function delete(Request $request){
        abort_if(!$request->id, 400, "Bad request.");

        try {
            $affectedRows = CategoryService::deleteCategory($request->id);
        }catch(QueryException | Exception $e){
            abort(422, $e->getMessage());
        }

        if($affectedRows>0){
            return Response::json(['status'=>'success', 'id'=>$request->id], 200);
        }
        return Response::json(['status'=>'Not found', 'id'=>$request->id], 204);
    }

}
