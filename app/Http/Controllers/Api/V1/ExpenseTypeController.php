<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ExpenseTypeResource;
use App\Models\Shop;
use Illuminate\Http\Request;

class ExpenseTypeController extends Controller
{
    public function shopExpenseTypes(Request $request, $shop_id)
    {

        return ExpenseTypeResource::collection(Shop::find($shop_id)->expenseTypes);
    }
}
