<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ShopResource;
use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return ShopResource::collection(Shop::get());
    }
}
