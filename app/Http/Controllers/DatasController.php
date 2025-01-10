<?php

namespace App\Http\Controllers;

use App\Models\timework;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DatasController extends Controller
{
    public function AutoAction(){
        if(Auth::check()){
            return timework::create([
                'employee_id' =>Auth::user()->employee_id,
                'start_time' => now(),
            ]);  
        }
    }


public function calculateWorkTime(Request $request) {
 if(Auth::check()){
    $start= timework::where('employee_id', Auth::user()->employee_id)
    ->whereNull('end_time')
    ->latest()
    ->first();
    // Convertir en objets DateTime
    $startTime = new DateTime($start->start_time);
    $endTime = new DateTime(now());

    // Calcul de la durée (par exemple)
 
    ///dd($workDuration);
    //$convert=new DateTime($workDuration);
    $workDuration = $startTime->diff($endTime);
    //dd($workDuration->format('H:i'));
    $totalMinutes = ($workDuration->h * 60) + $workDuration->i;
   // dd($totalMinutes);
   //$date= DateTime::createFromFormat('Y-m-d H:i:s',$ab);
   //$start->duration= $datetimeResult ;
    $start->update();
    return response()->json([
        'start' => $startTime->format('H:i'),
        'end' => $endTime->format('H:i'),
        'duration' => $workDuration->format('%h h%i:%s'),
        'users'=>Auth::user()->name
    ]);
 }
}

}
