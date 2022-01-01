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
            'TotalAmount' => (string)$this->total_amount,

            'shop' => new  ShopResource($shop),
            $this->mergeWhen($user, [
                'user' => [
                    'userId' => $this->user->id,
                    'name' => ucwords($this->user->name),
                    'email' => $this->user->email,
                ]]),

            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
