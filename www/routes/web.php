<?php

Route::get('/', function () {
    return view('home');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::post('/auth-token', 'AuthController@getToken')->name('auth-token')->middleware('cors');
