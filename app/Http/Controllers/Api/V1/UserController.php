<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{


    public function index(Request $request)
    {
        return UserResource::collection(User::with(['shops', 'permissions'])->simplePaginate(10));
    }
}
