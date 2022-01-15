<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{


    public function index(Request $request)
    {
        return UserResource::collection(User::with(['shops', 'permissions'])->simplePaginate(10));
    }


    public function store(StoreUserRequest $request)
    {

        try {
            DB::beginTransaction();

            // create new user.
            $newUser = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'phone' => $request['phone'],
                'password' => bcrypt($request['password'])
            ]);

            // assign shops.
            $newUser->shops()->sync($request['shops']);

            // assign permissions.
            $newUser->syncPermissions($request['permissions']);

            // success
            DB::commit();

            $user = User::with(['shops', 'permissions'])->find($newUser->id);

            return new UserResource($user);


        } catch (\Exception $e) {
            // failed
            DB::rollBack();

            return response()->json([
                "errors" => (object)["message" => ["Something went wrong, please try again."]]
            ], 403);

        }

    }

    public function update(UpdateUserRequest $request, User $user)
    {


        try {
            DB::beginTransaction();

            $payload = [
                'phone' => $request['phone'],
                'is_active' => $request['isActive'],
            ];

            if ($request['new_password']) {
                $payload = array_merge($payload, ['password' => bcrypt($request['new_password'])]);
            }

            // update user
            $user->update($payload);

            // assign shops.
            $user->shops()->sync($request['shops']);

            // assign permissions.
            $user->syncPermissions($request['permissions']);

            // success
            DB::commit();

            $updatedUser = User::with(['shops', 'permissions'])->find($user->id);

            return new UserResource($updatedUser);


        } catch (\Exception $e) {
            // failed
            DB::rollBack();

            return response()->json([
                "errors" => (object)["message" => ["Something went wrong, please try again." . $e]]
            ], 403);

        }

    }


}
