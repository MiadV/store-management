<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\V1\AuthController;

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

Route::post('/login', [AuthController::class, 'login']);


Route::get('/expense/{id}', function (Request $request, $id) {
    return \App\Models\Expense::with(["expenseRule.expenseType","expenseRule.shop"])->get();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
//        return $request->user()->getPermissionNames();
//        return $request->user()->with("shops")->get();
        return $request->user();
    });

    Route::get('/shop/{id}', function (Request $request, $id) {
        return \App\Models\Shop::with("expenseTypes")->find($id);
    });

});
