<?php
use App\Http\Controllers\CongeeController;
use App\Http\Controllers\CandidatController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {

Route::get('/User',function(Request $request){
    return $request->user();
});
 
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::post('/forgot-password', [LoginController::class, 'forgotPassword']);
Route::middleware(['auth:sanctum'])->post('/logout', [LoginController::class, 'logout']);

Route::middleware(['auth:sanctum'])->put('/user/update', [UserController::class, 'update']);

Route::apiResource('employees', EmployeeController::class);
Route::apiResource('candidats', CandidatController::class);
Route::apiResource('congees', CongeeController::class);


