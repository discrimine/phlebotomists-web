<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
], function (){

    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/doctor/register', 'Auth\RegisterController@register');

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('/logout', 'Auth\LoginController@logout');

        Route::get('users', 'UsersController@index');
        Route::get('user/{id}', 'UsersController@show');
        Route::put('user/{id}', 'UsersController@update');
        Route::put('user/{id}/status', 'UsersController@update');
        Route::delete('user/{id}', 'UsersController@delete');

        Route::get('orders', 'UsersController@index');
        Route::get('order/{id}', 'UsersController@show');
        Route::put('order/{id}', 'UsersController@update');
        Route::delete('order/{id}', 'UsersController@delete');

        Route::get('doctors', 'DoctorsController@index');
        Route::get('doctors/{id}', 'DoctorsController@show');
        Route::put('doctors/{id}', 'DoctorsController@update');
        Route::delete('doctors/{id}', 'DoctorsController@delete');

        Route::get('{user_id}/orders', 'UsersController@index');
        Route::get('{user_id}/order/{id}', 'UsersController@show');
        Route::put('{user_id}/order/{id}', 'UsersController@update');
        Route::delete('{user_id}/order/{id}', 'UsersController@delete');
    });
});