<?php

Route::get('/', function () {
    return view('stranger');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('dashboard', 'App\Http\Controllers\UserController@dashboard')->middleware('auth');
Auth::routes();

Route::get('/pass-grant-auth', function(){
    $http = new GuzzleHttp\Client;

    $response = $http->post('http://localhost/public/oauth/token',[
        'form_params' => [
            'grant_type' => 'password',
            'client_id' => 3,
            'client_secret' => 'ZqlcdTkBMgzFb7X747aefPmKQGk86TEFIxtn2rOt',
            'username' => 'gab@gab.com',
            'password' => 'admin123',
            'scope' => '*',
            //'redirect_uri' => 'http://localhost',
        ],
    ]);

    $tokens = json_decode((string) $response->getBody(), true);
    print_r($tokens);
});

Route::post('/auth-token', 'AuthController@getToken')->name('auth-token')->middleware('cors');

Route::group(['prefix'=>'api', 'namespace'=>'Api'],
    function(){
        Route::resource('city', 'CityController');
    });

Route::group(['prefix'=>'api', 'namespace'=>'Api'],
    function(){
        Route::resource('state', 'StateController');
    });


