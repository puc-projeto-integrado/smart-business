<?php
namespace App\Service;

use App\Category;
use Doctrine\DBAL\Query\QueryException;
use Exception;

class CategoryService{

    public static function getCategoryById(int $id){
        try {
            $category =  Category::where('id', $id)
                ->get();
            foreach ($category as $item){
                return $item;
            }
        }catch (QueryException | Exception $e){
            return $e->getMessage();
        }
    }
}
