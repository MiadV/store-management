<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'shopId' => $this->id,
            'title' => ucwords($this->title),
            'address' => $this->address,
            'isActive' => $this->is_active,
            'users' => UserResource::collection($this->whenLoaded('users')),
        ];
    }
}
