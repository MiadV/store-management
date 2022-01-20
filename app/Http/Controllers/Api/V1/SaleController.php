<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResource;
use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SaleController extends Controller
{
    public function index(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'page' => ['integer'],
            'shop_id' => ['integer'],
            'date_from' => ['date_format:Y-m-d'],
            'date_to' => ['date_format:Y-m-d'],
        ])->safe()->all();

        $shopId = $validator['shop_id'] ?? null;
        $dateFrom = $validator['date_from'] ?? null;
        $dateTo = $validator['date_to'] ?? null;

        $salesReport = Sale::with(['user', 'shop'])
            ->where(function ($query) use ($shopId, $dateFrom, $dateTo) {
                if ($shopId) $query->where('shop_id', $shopId);
                if ($dateFrom && $dateTo) $query->whereBetween('report_date', [$dateFrom, $dateTo]);
            })
            ->orderBy('report_date', 'desc')
            ->simplePaginate(10);

        return SaleResource::collection($salesReport)
            ->response()
            ->setEncodingOptions(JSON_UNESCAPED_SLASHES);
    }


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

        // check if user has access to this shop
        $authUser = User::with(['shops'])->find(auth()->id());

        if (!$authUser->shops->pluck('id')->contains($saleReport->shop_id)) {
            return response()->json([
                "errors" => (object)["message" => ["You dont have access to view this report."]]
            ], 401);
        }
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
        // 1- disable editing old reports.
        if (Carbon::createFromDate($report->created_at)->addHours(config('constants.sale_edit_cutoff_time', 4)) < now()) {
            return response()->json([
                "errors" => (object)["message" => ["Old reports can't be edited."]]
            ], 403);
        }


        return $report->update($request->safe()->except(['report_date', 'shop_id']));
    }

}
