<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/name',function(){
return ['name'=>'rizvan khan','age'=>'29'];
});



Route::post('/register', [AuthController::class, 'register']);