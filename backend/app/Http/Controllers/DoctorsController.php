<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorsController extends Controller
{
    public  function index() {
        return Doctor::all();
    }

    public function show($id) {
        return Doctor::find($id);
    }

    public  function update(Request $request, $id) {
        $user = Doctor::find($id);
        $user->update($request->all());

        return $user;
    }
}
