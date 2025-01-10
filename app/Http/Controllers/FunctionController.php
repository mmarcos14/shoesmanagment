<?php

namespace App\Http\Controllers;

use App\Models\Functions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FunctionController extends Controller
{
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
         'code'=>"required",
         'name'=>'required',
        'description'=> 'required',
        'salary'=> 'required'

        ]);

        if($validator->fails()){
           return response()->json(['status'=>422,'errors'=>$validator->errors()]);
        }
        else{
            $f=new Functions();
            $f->code=$this->getLastcode();
            $f->name=$request->name;
            $f->description=$request->description;
            $f->salary=$request->salary;
            $f->save();
             
        }
    }

    public function getLastcode(){
        $code="";
        $function=Functions::orderBy('id','DESC')->limit(1)->first();
        if($function && !empty($function->code)){
            $ex=str_replace("F","",$function->code);
            $increase=$ex+1;
            $string=str_pad($increase,4,0,STR_PAD_LEFT);
            $code="F".$string;
        }else{
            $code="F0001";
        }
        return $code;
    }

    public function all(Request $request){
        $f=Functions::orderBy('code','DESC')->get();
        return $f;
    }

    public function edit(Request $request,$id){
        $f=Functions::find($id);
        return $f;
    }

    public function update(Request $request,$id){
            $f=Functions::find($id);
            $f->name=$request->name;
            $f->description=$request->description;
            $f->salary=$request->salary;
            $f->update();  
            return true;
    }

}
