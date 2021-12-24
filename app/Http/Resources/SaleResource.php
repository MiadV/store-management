<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $shop = $this->whenLoaded('shop');
        $user = $this->whenLoaded('user');


        return [
            'saleId' => $this->id,
            'description' => $this->description,
            'reportDate' => $this->report_date,
            'cashAmount' => $this->cash_amount,
            'cardAmount' => $this->card_amount,
            'onlineTransferAmount' => $this->online_transfer_amount,
            'shop' => new  ShopResource($shop),
            'user' => new  ShopResource($user),
        ];
    }
}
