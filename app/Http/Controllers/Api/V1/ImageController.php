<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\ImageRequest;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;


class ImageController extends Controller
{

    public function store(ImageRequest $request)
    {

        $fileName = Carbon::now()->timestamp . '_' . Str::random(5) . '.' . $request->file('image')
                ->getClientOriginalExtension();

        $request->image->move(public_path('uploads/image/expense'), $fileName);

        return Image::create([
            "name" => $fileName,
            "image_path" => 'uploads/image/expense/',
        ]);
    }


    public function destroy(Request $request, Image $image)
    {

        unlink($image->image_path . $image->name);

        return $image->delete();
    }
}
