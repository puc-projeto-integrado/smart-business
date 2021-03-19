<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=>'business/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function(){
        Route::get('/', 'BusinessController@index')->name('business');
        Route::get('/highlight', 'BusinessController@highlights')->name('businessHighlights');
        Route::get('/{id}', 'BusinessController@show')->name('businessDetail');
        Route::get('/state/{id}', 'BusinessController@byState')->name('businessByState');
        Route::get('/city/{id}', 'BusinessController@byCity')->name('businessByCity');
        Route::get('/category/{id}', 'BusinessController@byCategory')->name('businessByCategory');
        Route::post('/add', 'BusinessController@add')->name('businessAdd')->middleware('auth');
        Route::get('/user/{id}', 'BusinessController@byUser')->name('businessByUser')->middleware('auth');
        Route::delete('/delete', 'BusinessController@delete')->name('businessDelete')->middleware('auth');
    });

Route::group(['prefix'=>'stats/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/category', 'StatsController@byCategory')->name('statsByCategory');
        Route::get('/city', 'StatsController@byCity')->name('statsByCity');
        Route::get('/state', 'StatsController@byState')->name('statsByState');
        Route::get('/favorite', 'StatsController@byFavorite')->name('statsByFavorites');
    });

Route::group(['prefix'=>'favorites/', 'namespace'=>'Api', 'middleware'=>['cors', 'auth']],
    function(){
        Route::get('/{id}', 'FavoriteController@show')->name('favoritesShow');
        Route::post('/add', 'FavoriteController@add')->name('favoritesAdd');
        Route::delete('/delete', 'FavoriteController@delete')->name('favoritesDelete');
    });
//https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=784p4owi2ycdf8&redirect_uri=http://2cd1d326f68e.ngrok.io/public/api/oauth&state=DCEeFWf45A53sdfKef424&scope=r_liteprofile

Route::group(['namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::post('/login/', 'AuthController@login')->name('login');
        Route::get('/state', 'StateController@index')->name('state');
        Route::get('/state/{id}', 'CityController@citiesByState')->name('citiesByState');
        Route::get('/city', 'CityController@index')->name('city');
        Route::get('/category', 'CategoryController@index')->name('category');
        Route::get('/oauth', 'FooController@index')->name('category');
    });

Route::group(['prefix'=>'user/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::post('/add/', 'AuthController@addUser')->name('addUser');
    });
