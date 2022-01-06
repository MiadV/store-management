<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\V1\AuthController;
use \App\Http\Controllers\Api\V1\SaleController;
use \App\Http\Controllers\Api\V1\ExpenseController;
use \App\Http\Controllers\Api\V1\ExpenseTypeController;
use \App\Http\Controllers\Api\V1\ImageController;

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

Route::middleware('auth:sanctum')
    ->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'currentUser']);

        Route::prefix('upload')
            ->group(function () {
                Route::post('/image', [ImageController::class, 'store']);
                Route::delete('/image', [ImageController::class, 'destroy']);
            });

        Route::prefix('sale')
            ->middleware('permission:SALES_REPORT')
            ->group(function () {

                Route::post('/', [SaleController::class, 'store']);

                Route::put('/{report}', [SaleController::class, 'update'])
                    ->where('report', '[0-9]+');

                Route::get('/latest/{shop_id}', [SaleController::class, 'latestSaleReport'])
                    ->where('shop_id', '[0-9]+');

                Route::get('/{sale_id}', [SaleController::class, 'show'])
                    ->where('sale_id', '[0-9]+');
            });

        Route::prefix('expense')
            ->middleware('permission:EXPENSE_REPORT')
            ->group(function () {

                Route::get('/{report}', [ExpenseController::class, 'show'])
                    ->where('report', '[0-9]+');

                Route::get('/types/{shop_id}', [ExpenseTypeController::class, 'shopExpenseTypes'])
                    ->where('shop_id', '[0-9]+');

                Route::get('/limit-balance/{expense_type_shop_id}', [ExpenseTypeController::class, 'limitBalance'])
                    ->where('expense_type_shop_id', '[0-9]+');

                Route::get('/current-month/{shop_id}', [ExpenseController::class, 'currentMonthReports'])
                    ->where('shop_id', '[0-9]+');


                Route::post('/', [ExpenseController::class, 'store']);

                Route::put('/{report}', [ExpenseController::class, 'update'])
                    ->where('report', '[0-9]+');

            });

    });



//
//Route::get('/expense/{id}', function (Request $request, $id) {
//    return \App\Models\Expense::with(["expenseRule.expenseType","expenseRule.shop"])->get();
//});

//    Route::get('/shop/{id}', function (Request $request, $id) {
//        return \App\Models\Shop::with("expenseTypes")->find($id);
//    }
