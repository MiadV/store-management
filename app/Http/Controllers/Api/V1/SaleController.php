<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SaleResource;
use App\Http\Resources\UserResource;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function latestSaleReport(Request $request, $shop_id)
    {

        $saleReport = Sale::where("shop_id", $shop_id)
            ->with(['shop', 'user'])
            ->orderBy('created_at', 'desc')
            ->first();

        return new SaleResource($saleReport);
    }

}
