<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use \Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{

    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function signup(Request $request) {
        $this->validate($request, [
            'login' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required', //string|min:8|confirmed
        ]);

        $user = new User([
            'login' => $request->input('login'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function signin(Request $request) {
        $this->validate($request, [
            'login' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required', //string|min:8|confirmed
        ]);
        $credientals = $request->only('email', 'password');

        try {
            if(!$token = $this->auth->attempt($credientals)){
                return response()->json([
                    'error' => "Invalid Credential 1111"
                ], 401);
            }
        } catch (JWTException $e){
            return response()->json([
                'error' => 'Could not create token!'
            ], 500);
        }

        return response()->json([
           'token' => $token
        ], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            $this->auth->invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }

    public  function index() {
        return User::all();
    }

    public function show($id) {
        return User::find($id);
    }

    public  function update(Request $request, $id) {
        $user = User::find($id);
        $message = 'User has been updated';
        if(isset($request['status'])){
            $user->status = $request['status'];
            $message = 'Status has been updated';
        } else {
            $user->update($request->all());
        }

        try{
            $user->update();
            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => $message
            ], 200);
        } catch (Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong'
            ], 500);
        }

    }

    public  function delete($id) {
        $user = User::find($id);
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => "User has been deleted"
        ], 204);
    }
}
