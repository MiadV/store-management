<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{
    // Permissions are created in PermissionsSeeder.


    public function index(Request $request)
    {
        return DB::table('permissions')
            ->select(['name', 'id'])
            ->get();
    }

}
