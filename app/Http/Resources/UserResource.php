<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $shops = $this->whenLoaded('shops');
        $permissions = $this->whenLoaded('permissions');

        return [
            'userId' => $this->id,
            'name' => ucwords($this->name),
            'email' => $this->email,
            'phone' => $this->phone,
            'isActive' => $this->is_active,
            'shops' => ShopResource::collection($shops),
            'permissions' => PermissionsResource::collection($permissions),
        ];
    }
}
