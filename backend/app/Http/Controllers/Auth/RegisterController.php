<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\RoleUser;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\JWTAuth;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '';
    protected $auth;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function register(Request $request)
    {
//        $validator = $this->validate(request(), [
//            'name' => 'required',
//            'email' => 'required|email',
//            'password' => 'required',
////            'g-recaptcha-response' => 'required|captcha',
//        ]);

        $validator = $this->validator($request->all());

        if(!$validator->fails()){
            $user = $this->create($request->all());
            $credientals = $request->only('email', 'password');
            $token = $this->auth->attempt($credientals);

            return response()->json([
                'success' => true,
                'data' => $user,
                'token' => $token
            ], 200);

        }

        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ]);

        /*, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
//            'g-recaptcha-response' => 'required|captcha',
        ]);
        */

//        $credientals = $request->only('email', 'password');
//
//        User::create([
//            'name' => $request['name'],
//            'email' => $request['email'],
//            'password' => Hash::make($request['password']),
//        ]);
//
//        try {
//            if(!$token = $this->auth->attempt($credientals)){
//                return response()->json([
//                    'error' => "Invalid Credential"
//                ], 401);
//            }
//        } catch (JWTException $e){
//            return response()->json([
//                'error' => 'Could not create token!'
//            ], 500);
//        }
//
//        return response()->json([
//            'token' => $token
//        ], 200);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
//            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
//        $this->validate(request(), [
//            'name' => 'required',
//            'email' => 'required|email',
//            'password' => 'required|confirmed',
////            'g-recaptcha-response' => 'required|captcha',
//        ]);

        $doctor = new Doctor($data);
        unset($doctor['password'], $doctor['email']);

        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->doctors()->save($doctor);
        $user->assignRole('doctor');

        return $user;
    }
}
