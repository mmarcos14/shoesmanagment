<?php

use App\Http\Controllers\FunctionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/{any?}', function () {
    return view('welcome');
});

Route::post('function/store',[FunctionController::class,'store']);
Route::get('function/getlastcode',[FunctionController::class,'getLastcode']);
Route::get('function/all',[FunctionController::class,'all']);


