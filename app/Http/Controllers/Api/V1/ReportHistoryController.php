<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Expense;
use App\Models\Sale;
use Illuminate\Http\Request;

class ReportHistoryController extends Controller
{
    public function show(Request $request, $shop_id, $year, $month, $day)
    {
        $saleReport = Sale::where('shop_id', $shop_id)
            ->whereDate('report_date', $year . '-' . $month . '-' . $day)
            ->first();

        if (!$saleReport) {
            return response()->json([
                "errors" => (object)["message" => ["No sales report is submitted for this date."]]
            ], 403);
        }

        // should not contain accountant only expenses.
        $expenseReports = Expense::with(['expenseType'])
            ->where('shop_id', $request->shop_id)
            ->whereDate('report_date', $year . '-' . $month . '-' . $day)
            ->whereRelation('expenseType', 'accountant_only', false)
            ->get();


        return response()->json(['saleReport' => $saleReport, 'expenseReports' => $expenseReports, 'sumOfExpenses' => $expenseReports->sum('amount')]);
    }
}
