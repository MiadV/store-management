<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use Carbon\Carbon;
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


    public function show(Request $request, $sale_id)
    {

        $saleReport = Sale::with(['shop', 'user'])->findOrFail($sale_id);

        return new SaleResource($saleReport);
    }


    public function store(StoreSaleRequest $request)
    {

        // check if report already exists for this REPORT_DATE AND SHOP_ID.
        $check = Sale::where("shop_id", $request->shop_id)
            ->where("report_date", $request->report_date)
            ->first();

        if ($check) {
            return response()->json([
                "errors" => (object)["message" => ["Report already exists."]]
            ], 403);
        }

        return new SaleResource(
            Sale::create($request->safe()
                ->merge(['user_id' => auth()->id()])
                ->all())
        );
    }

    public function update(UpdateSaleRequest $request, Sale $report)
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


        return $report->update($request->safe()->except(['report_date', 'shop_id']));
    }

}
