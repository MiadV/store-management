<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

//    public function register(Request $request)
//    {
//        $fields = $request->validate([
//            'name' => 'required|string',
//            'email' => 'required|string|unique:users,email',
//            'password' => 'required|string|confirmed'
//        ]);
//
//        $user = User::create([
//            'name' => $fields['name'],
//            'email' => $fields['email'],
//            'password' => bcrypt($fields['password'])
//        ]);
//
//        $token = $user->createToken('auth_token')->plainTextToken;
//
//        $response = [
//            'user' => $user,
//            'token' => $token
//        ];
//
//        return response($response, 201);
//    }

    public function managerLogin(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(["errors" => (object)["message" => ["Wrong credentials."]]], 403);
        }

        // Check if user is disabled.
        if (!$user["is_active"]) {
            return response()->json(["errors" => (object)["email" => ["Disabled Account."]]], 403);
        }

        // TODO => Replace token-name with device name.
        $token = $user->createToken('auth_token_manager')->plainTextToken;

        return response()->json(["token" => $token], 200);
    }

    public function accountantLogin(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(["errors" => (object)["message" => ["Wrong credentials."]]], 403);
        }

        // Check if user is disabled.
        if (!$user["is_active"]) {
            return response()->json(["errors" => (object)["email" => ["Disabled Account."]]], 403);
        }

        // Check if user is accountant.
        if (!$user->hasPermissionTo('ACCOUNTING_MODULE')) {
            return response()->json(["errors" => (object)["email" => ["You dont have access to accounting module."]]], 403);
        }

        // TODO => Replace token-name with device name.
        $token = $user->createToken('auth_token_accountant')->plainTextToken;

        return response()->json(["token" => $token], 200);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json(["message" => 'Logged out.'], 200);
    }


    public function currentUser(Request $request)
    {
        $authUser = User::with(['shops', 'permissions'])->find(auth()->id());

        return new UserResource($authUser);
    }
}




