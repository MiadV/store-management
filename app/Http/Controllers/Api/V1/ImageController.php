<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ImageRequest;
use App\Models\Image as ImageModel;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;


class ImageController extends Controller
{

    public function store(ImageRequest $request)
    {
        $image = $request->file('image');
        $fileName = Carbon::now()->timestamp . '_' . Str::random(5) . '_expense';
        $extension = $image->extension();

        // create thumbnail

        // resize the image so that the largest side fits within the limit; the smaller
        // side will be scaled to maintain the original aspect ratio
        Image::make($image)
            ->resize(700, 700, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save(public_path('uploads/image/expense') . '/' . $fileName . '_thumbnail.' . $extension);

        // store original image
        $request->image->move(public_path('uploads/image/expense'), $fileName . '.' . $extension);


        return ImageModel::create([
            'uploaded_by' => auth()->id(),
            "name" => $fileName,
            'extension' => $extension,
            "image_path" => 'uploads/image/expense/',
        ]);
    }


    public function destroy(Request $request)
    {
        $fields = $request->validate([
            'ids' => 'required|array',
        ]);

        // select all images from db
        $images = ImageModel::whereIn('id', $fields['ids'])->get();

        foreach ($images as $image) {
            unlink($image->image_path . $image->name . '.' . $image->extension);
            unlink($image->image_path . $image->name . '_thumbnail.' . $image->extension);
            $image->delete();
        }

        return true;
    }
}
