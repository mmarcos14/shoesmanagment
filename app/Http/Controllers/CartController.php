<?php

namespace App\Http\Controllers;

use App\Models\size;
use App\Models\sneaker;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request,$id){
        $size=sneaker::with('sizes')->where('id',$id)->first();
        return $size;
    }
}
