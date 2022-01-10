<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ExpenseResource;
use App\Http\Resources\SaleResource;
use App\Models\Expense;
use App\Models\Sale;
use Illuminate\Http\Request;

class ReportHistoryController extends Controller
{
    public function show(Request $request, $shop_id, $year, $month, $day)
    {
        $saleReport = Sale::with('shop')
            ->where('shop_id', $shop_id)
            ->whereDate('report_date', $year . '-' . $month . '-' . $day)
            ->first();

        if (!$saleReport) {
            return response()->json([
                "errors" => (object)["message" => ["No sales report is submitted for this date."]]
            ], 403);
        }

        // should not contain accountant only expenses.
        $expenseReports = Expense::with(['expenseType', 'images'])
            ->where('shop_id', $request->shop_id)
            ->whereDate('report_date', $year . '-' . $month . '-' . $day)
            ->whereRelation('expenseType', 'accountant_only', false)
            ->get();


        return response()->json([
            'saleReport' => new SaleResource($saleReport),
            'expenseReports' => ExpenseResource::collection($expenseReports),
            'sumOfExpenses' => $expenseReports->sum('amount'),
            'balance' => floatval(str_replace(',', '', $saleReport['total_amount'])) - $expenseReports->sum('amount'),
        ]);
    }
}
