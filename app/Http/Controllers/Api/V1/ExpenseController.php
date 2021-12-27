<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use App\Models\ExpenseTypeShop;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function store(StoreExpenseRequest $request)
    {

        // 1- report date should not be older than 1 day. (checked in form request).
        // TODO 2- strictly limited expenses should be checked if theres enough balance left.
        // TODO 3- accountant only expenses should be submitted by accountants only.

        // 4- shopId and ExpenseTypeId should match with expenseTypeShopId and submitted shopId.
        $expenseRule = ExpenseTypeShop::where('id', $request->expense_type_shop_id)
            ->where('is_active', true)
            ->with('expenseType')
            ->first();

        if (!$expenseRule or ($expenseRule->shop_id !== $request->shop_id)) {
            return response()->json([
                "errors" => (object)["message" => ["Expense type is not valid for this shop."]]
            ], 403);
        }


        return Expense::create($request->safe()
            ->merge(['user_id' => auth()->id(), 'expense_type_id' => $expenseRule->expense_type_id])
            ->all());
    }

    public function update(UpdateExpenseRequest $request, Expense $report)
    {

        // 1- Each user can edit his submitted report only.
        if ($report->user_id != auth()->id()) {
            return response()->json([
                "errors" => (object)["message" => ["You can't edit this report."]]
            ], 403);
        }

        // 2- disable editing old reports.
        // 3- TODO move constants to config file.
        if (Carbon::createFromDate($report->created_at)->addHours(4) < now()) {
            return response()->json([
                "errors" => (object)["message" => ["Old reports can't be edited."]]
            ], 403);
        }

        return $report->update($request->safe()->except(['report_date', 'shop_id', 'expense_type_shop_id']));
    }
}
