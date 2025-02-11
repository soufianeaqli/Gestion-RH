<?php
use App\Http\Controllers\CongeeController;
use App\Http\Controllers\CandidatController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('candidats', CandidatController::class);
Route::apiResource('employees', EmployeeController::class);
Route::apiResource('congees', CongeeController::class);


