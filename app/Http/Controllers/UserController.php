<?php

namespace App\Http\Controllers;

use App\Models\timework;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request){

        $credentials=['email'=>$request->username,'password'=>$request->password];
       if(Auth::attempt($credentials)){
        $this->startWorkSession();
        return response()->json(['status'=>200,'satrt_time'=>$this->getActiveWorkSession()]);
       }else{
        return response()->json(['status'=>402]);

       }
    }

    public function Logout(){
        Auth::logout();
        return true;
    }


    public function startWorkSession()
    {
    return timework::create([
        'employee_id' =>Auth::user()->employee_id,
        'start_time' => now(),
    ]);

    }

    public function getActiveWorkSession()
{
   if(Auth::check()){
    $workSession = timework::where('employee_id', Auth::user()->employee_id)
    ->whereNull('end_time')
    ->latest()
    ->first();

if ($workSession) {
   
    return $workSession->start_time;
}
   }

    //return response()->json(['message' => 'No active session found'], 404);
}

}
