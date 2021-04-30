<?php

namespace App\Http\Controllers\Api;

use App\Business;
use App\Http\Controllers\Controller;
use App\Service\StatsService;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function byCategory(){
        return $this->jsonResponseinUtf8(StatsService::getStatsByCateogry());
    }

    public function byCity(){
        return $this->jsonResponseinUtf8(StatsService::getStatsByCity());
    }

    public function byState(){
        return $this->jsonResponseinUtf8(StatsService::getStatsByState());
    }

    public function byFavorite(){
        return $this->jsonResponseinUtf8(StatsService::getStatsByFavorite());
    }

    public function byRegisters(){
        return $this->jsonResponseinUtf8(StatsService::getStatsByRegisters());
    }
}
