<?php
namespace App\Service;

use App\Category;
use Doctrine\DBAL\Query\QueryException;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CategoryService{

    public static function getCategories(){
        return Category::all();
    }

    public static function getCategoryById(int $id){
            $category =  Category::where('id', $id)->get();
            foreach ($category as $item) {
                return $item;
            }
    }

    public static function updateCategory(Request $request){
        $updateData['name'] = $request->name;
        return Category::where('id', $request->id)->update($updateData);
    }

    public static function addCategory($name){
        if(count(Category::where('name', '=', $name)->get()->toArray())>0){
            Throw new Exception('Category already exists.');
        }

        $category = new Category;
        $category->name = $name;
        $category->save();
    }

    public static function deleteCategory(int $id) : int{
        return Category::where('id', $id)->forceDelete();
    }
}
