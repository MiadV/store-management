<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Models\ExpenseTypeShop;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseController extends Controller
{

    public function show(Request $request, $report)
    {
        $expenseReport = Expense::with(['user', 'images', 'shop', 'expenseType'])
            ->where('id', $report)
            ->firstOrFail();

        return (new ExpenseResource($expenseReport))
            ->response()
            ->setEncodingOptions(JSON_UNESCAPED_SLASHES);
    }


    public function currentMonthReports(Request $request)
    {
        // 1- should not return accountant_only expenses.
        // 2- return paginated data.

        $expenseReports = Expense::with(['user', 'images', 'shop', 'expenseType'])
            ->where('shop_id', $request->shop_id)
            ->whereRelation('expenseType', 'accountant_only', false)
            ->whereYear('report_date', Carbon::now()->year)
            ->whereMonth('report_date', Carbon::now()->month)
            ->orderBy('report_date', 'desc')
            ->simplePaginate(3);

        return ExpenseResource::collection($expenseReports)
            ->response()
            ->setEncodingOptions(JSON_UNESCAPED_SLASHES);
    }


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

        try {
            DB::beginTransaction();

            $expenseReport = Expense::create($request->safe()
                ->merge(['user_id' => auth()->id(), 'expense_type_id' => $expenseRule->expense_type_id])
                ->all());

            // 5- update expense_id in images table if there is any media uploaded.
            $image_ids = $request->safe()['image_ids'];
            if (!empty($image_ids)) {
                Image::whereIn('id', $image_ids)->update(['expense_id' => $expenseReport->id]);
            }


            // success
            DB::commit();

            $expenseReports = Expense::with(['user', 'images', 'shop', 'expenseType'])
                ->find($expenseReport->id);

            return new ExpenseResource($expenseReports);


        } catch (\Exception $e) {
            // failed
            DB::rollBack();

            return response()->json([
                "errors" => (object)["message" => ["Something went wrong, please try again."]]
            ], 403);

        }


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
        if (Carbon::createFromDate($report->created_at)->addHours(config('constants.expense_edit_cutoff_time', 4)) < now()) {
            return response()->json([
                "errors" => (object)["message" => ["Old reports can't be edited."]]
            ], 403);
        }

        // TODO 3- update images if has been edited.

        return $report->update($request->safe()->except(['report_date', 'shop_id', 'expense_type_shop_id']));
    }
}
