<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\V1\AuthController;
use \App\Http\Controllers\Api\V1\SaleController;
use \App\Http\Controllers\Api\V1\ExpenseController;
use \App\Http\Controllers\Api\V1\ExpenseTypeController;
use \App\Http\Controllers\Api\V1\ImageController;
use \App\Http\Controllers\Api\V1\ReportHistoryController;
use \App\Http\Controllers\Api\V1\UserController;
use \App\Http\Controllers\Api\V1\PermissionController;
use \App\Http\Controllers\Api\V1\ShopController;

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

Route::post('/login', [AuthController::class, 'managerLogin']);
Route::post('/accountant/login', [AuthController::class, 'accountantLogin']);

Route::middleware('auth:sanctum')
    ->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'currentUser']);

        Route::prefix('upload')
            ->group(function () {
                Route::post('/image', [ImageController::class, 'store']);
                Route::post('/image/delete', [ImageController::class, 'destroy']);
            });

        Route::prefix('sale')
            ->middleware('permission:SALES_REPORT')
            ->group(function () {

                Route::post('/', [SaleController::class, 'store']);

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

        Route::prefix('history')
            ->middleware('permission:REPORT_HISTORY')
            ->group(function () {
                Route::get('/{shop_id}/{year}/{month}/{day}', [ReportHistoryController::class, 'show'])
                    ->where(['shop_id' => '[0-9]+', 'year' => '[0-9]+', 'month' => '[0-9]+', 'day' => '[0-9]+']);

            });

        Route::prefix('accountant')
            ->middleware('permission:ACCOUNTING_MODULE')
            ->group(function () {
                Route::get('/permissions', [PermissionController::class, 'index']);

                Route::get('/shops', [ShopController::class, 'index']);

                Route::get('/user', [UserController::class, 'index']);
                Route::post('/user', [UserController::class, 'store']);
                Route::put('/user/{user}', [UserController::class, 'update'])
                    ->where('user', '[0-9]+');

                Route::get('/sales', [SaleController::class, 'index']);
                Route::put('/sales/{report}', [SaleController::class, 'update'])
                    ->where('report', '[0-9]+');
                Route::get('/sales/export', [SaleController::class, 'export']);

                Route::get('/expense', [ExpenseController::class, 'index']);
                Route::put('/expense/{report}', [ExpenseController::class, 'update'])
                    ->where('report', '[0-9]+');
                Route::get('/expense/export', [ExpenseController::class, 'export']);


                Route::post('/expense-type', [ExpenseTypeController::class, 'store']);
                Route::get('/expense-type', [ExpenseTypeController::class, 'index']);
                Route::post('/expense-type/assign', [ExpenseTypeController::class, 'assignExpenseToShop']);

            });

    });



