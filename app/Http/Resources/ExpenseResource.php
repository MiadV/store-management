<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
        $images = $this->whenLoaded('images');
        $expenseType = $this->whenLoaded('expenseType');

        return [
            'expenseId' => $this->id,
            'description' => $this->description,
            'reportDate' => $this->report_date,
            'amount' => $this->amount,

            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,

            'shop' => new ShopResource($shop),
            'images' => $images->pluck('full_path'),
            $this->mergeWhen($user, [
                'user' => [
                    'userId' => $this->user->id,
                    'name' => ucwords($this->user->name),
                    'email' => $this->user->email,
                ]]),
            $this->mergeWhen($expenseType, [
                'expenseType' => [
                    'expenseTypeId' => $this->expenseType->id,
                    'title' => ucwords($this->expenseType->title),
                    'accountantOnly' => $this->expenseType->accountant_only,
                ]]),
        ];
    }
}
