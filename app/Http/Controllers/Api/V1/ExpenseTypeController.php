<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\assignExpenseToStoreRequest;
use App\Http\Resources\ExpenseTypeItemResource;
use App\Http\Resources\ExpenseTypeResource;
use App\Http\Resources\UserResource;
use App\Models\Expense;
use App\Models\ExpenseType;
use App\Models\ExpenseTypeShop;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseTypeController extends Controller
{

    public function index(Request $request)
    {

        return ExpenseTypeItemResource::collection(ExpenseType::get());
    }


    public function store(Request $request)
    {

        $newExpenseType = ExpenseType::create([
            'title' => $request['title'],
            'accountant_only' => $request['accountant_only'],
        ]);

        return new ExpenseTypeItemResource($newExpenseType);
    }

    public function assignExpenseToShop(assignExpenseToStoreRequest $request)
    {

        // 1- check if this rule is currently assigned to this shop and set is_active=false.
        $oldRule = ExpenseTypeShop::where("shop_id", $request->shop_id)
            ->where("expense_type_id", $request->expense_type_id)
            ->where("is_active", true)
            ->first();

        try {
            DB::beginTransaction();


            if ($oldRule) {
                $oldRule->update(['is_active' => false]);
            }


            // 2- if any limit is specified add it to payload.
            $payload = [
                'expense_type_id' => $request['expense_type_id'],
                'shop_id' => $request['shop_id'],
            ];

            if ($request['limit_amount']) {
                $payload = array_merge($payload,
                    [
                        'limit_amount' => $request['limit_amount'],
                        'strict_limit' => $request['strict_limit']
                    ]);
            }

            ExpenseTypeShop::create($payload);

            // success
            DB::commit();

            return response(true, 201);


        } catch (\Exception $e) {
            // failed
            DB::rollBack();

            return response()->json([
                "errors" => (object)["message" => ["Something went wrong, please try again."]]
            ], 403);

        }
    }


    public function shopExpenseTypes(Request $request, $shop_id)
    {

        return ExpenseTypeResource::collection(Shop::find($shop_id)->expenseTypes);
    }


    public function limitBalance(Request $request, $expense_type_shop_id)
    {

        $expenseTypeShop = ExpenseTypeShop::findOrFail($expense_type_shop_id);

        // 1- calculate current month total amount for the this expenseType.
        $currentTotal = Expense::where('shop_id', $expenseTypeShop->shop_id)
            ->where('expense_type_id', $expenseTypeShop->expense_type_id)
            ->whereYear('report_date', Carbon::now()->year)
            ->whereMonth('report_date', Carbon::now()->month)
            ->sum('amount');


        return Response()->json([
            'limit' => $expenseTypeShop->limit_amount,
            'currentTotal' => number_format($currentTotal, 2),
            'balance' => number_format($expenseTypeShop->limit_amount - $currentTotal, 2),
            'isStrict' => $expenseTypeShop->strict_limit,
        ]);

    }
}
