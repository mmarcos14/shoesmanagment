<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DatasController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FunctionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SneakerController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//user 
Route::post("user/login",[UserController::class,'login']);
Route::get("user/logout",[UserController::class,'logout']);

Route::get("user/employee/timestart",[UserController::class,'getActiveWorkSession']);

Route::get('/{any?}', function () {
    return view('welcome');
});

Route::post('function/store',[FunctionController::class,'store']);
Route::get('function/getlastcode',[FunctionController::class,'getLastcode']);
Route::get('function/all',[FunctionController::class,'all']);
Route::get('function/edit/{id}',[FunctionController::class,'edit']);
Route::post('function/update/{id}',[FunctionController::class,'update']);
//management employee\
Route::post('employee/store',[EmployeeController::class,'store']);
Route::get('employee/getLastCode',[EmployeeController::class,'getLastEmployee']);
Route::get('employee/all',[EmployeeController::class,'all']);
Route::get('employee/range/{id?}',[EmployeeController::class,'RangeEmployee']);

Route::get('employee/edit/{id}',[EmployeeController::class,'edit']);
Route::get('employee/delete/{id}',[EmployeeController::class,'delete']);
Route::post('employee/update/{id}',[EmployeeController::class,'update']);
Route::get('store/delete/{id}',[StoreController::class,'deletestore']);






// management store
Route::post('store/store',[StoreController::class,'store']);
Route::get('store/all',[StoreController::class,'all']);
Route::get('store/edit/{id}',[StoreController::class,'edit']);
Route::post('store/update/{id}',[StoreController::class,'updatestore']);

Route::get('annex/getlastcode',[StoreController::class,'getLastcode']);
//annex
Route::post('annex/store',[StoreController::class,'annexstore']);
Route::get('annex/all',[StoreController::class,'allannex']);
Route::get('annex/delete/{id}',[StoreController::class,'deleteannex']);
Route::post('annex/update/{id}',[StoreController::class,'updateannexstore']);


//category
Route::post('category/store',[CategoryController::class,'store']);
Route::get('category/all',[CategoryController::class,'all']);
Route::get('category/edit/{id}',[CategoryController::class,'edit']);
Route::post('category/update/{id}',[CategoryController::class,'update']);
Route::get('category/delete/{id}',[CategoryController::class,'delete']);

//product\
Route::post('product/store',[SneakerController::class,'store']);
Route::get('product/all/{id}',[SneakerController::class,'getsneaker']);
Route::post('product/all2',[SneakerController::class,'getsneaker2']);

Route::get('product/catalogue',[SneakerController::class,'catalogue']);
Route::post('product/store/image',[SneakerController::class,'storeimage']);
Route::get('product/image/all',[SneakerController::class,'getImage']);

//managment time
Route::get('employee/work/time',[DatasController::class,'calculateWorkTime']);


//gestion de cart

Route::post('sneaker/size',[SneakerController::class,'getsneaker2']);
























