<?php

Route::get('/', function () {
    return view('stranger');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::post('/auth-token', 'AuthController@getToken')->name('auth-token')->middleware('cors');

Route::group(['prefix'=>'api', 'namespace'=>'Api'],
    function(){
        Route::resource('city', 'CityController');
    });
