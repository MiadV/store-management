<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
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
            'imageId' => $this->id,
            'uploader' => $this->uploaded_by,
            'expenseId' => $this->expense_id,
            'imagePath' => $this->image_path,
            'fullPath' => $this->full_path,
        ];
    }

}
