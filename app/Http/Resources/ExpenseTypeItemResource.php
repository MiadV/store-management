<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseTypeItemResource extends JsonResource
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
            'createdAt' => $this->created_at,
        ];
    }
}
