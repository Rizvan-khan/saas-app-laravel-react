<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v1/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/v1/logout', [AuthController::class, 'logout']);
    Route::get('/v1/profile', [AuthController::class, 'profile']);
});

Route::get('/v1/name', function () {
    return ['name' => 'rizvan khan', 'age' => '29', 'city' => 'New York'];
});

Route::post('/v1/register', [AuthController::class, 'register']);
Route::post('/v1/login', [AuthController::class, 'login']);