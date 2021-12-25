<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'expenseTypeId' => $this->id,
            'title' => ucwords($this->title),
            'accountantOnly' => $this->accountant_only,
            'expenseTypeShopId' => $this->pivot->id,
            'limitAmount' => $this->pivot->limit_amount,
            'isLimitStrict' => $this->pivot->strict_limit,
        ];
    }
}
