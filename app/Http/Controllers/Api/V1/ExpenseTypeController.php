<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ExpenseTypeResource;
use App\Models\Expense;
use App\Models\ExpenseTypeShop;
use App\Models\Shop;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;

class ExpenseTypeController extends Controller
{
    public function shopExpenseTypes(Request $request, $shop_id)
    {

        return ExpenseTypeResource::collection(Shop::find($shop_id)->expenseTypes);
    }


    public function limitBalance(Request $request, $expense_type_shop_id)
    {

        $expenseTypeShop = ExpenseTypeShop::findOrFail($expense_type_shop_id);

        // 1- check if passed expenseTypeShopId any has spend limit.
        if ($expenseTypeShop->limit_amount == null) {
            return response()->json([
                "errors" => (object)["message" => ["Expense type is not limited for this shop."]]
            ], 403);
        }

        // 2- calculate current month total amount for the this expenseType.
        $currentTotal = Expense::where('shop_id', $expenseTypeShop->shop_id)
            ->where('expense_type_id', $expenseTypeShop->expense_type_id)
            ->whereYear('report_date', Carbon::now()->year)
            ->whereMonth('report_date', Carbon::now()->month)
            ->sum('amount');


        return Response()->json([
            'limit' => $expenseTypeShop->limit_amount,
            'currentTotal' => $currentTotal,
            'balance' => number_format($expenseTypeShop->limit_amount - $currentTotal, 2),
            'isStrict' => $expenseTypeShop->strict_limit,
        ]);

    }
}
