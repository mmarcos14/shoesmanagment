<?php

namespace App\Http\Controllers;

use App\Models\annex;
use App\Models\store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
         'sigle'=>"required",
         'name'=>'required',
        'description'=> 'required'
        ]);

        if($validator->fails()){
           return response()->json(['status'=>422,'errors'=>$validator->errors()]);
        }
        else{
            $f=new store();
            $f->sigle=$request->sigle;
            $f->name=$request->name;
            $f->description=$request->description;
            $f->save();
             
        }
    }

    public function updatestore(Request $request,$id){
        return store::where('id',$id)
        ->update(['sigle'=>$request->sigle,'name'=>$request->name,'description'=>$request->description]);

        $f->sigle=$request->sigle;
            $f->name=$request->name;
            $f->description=$request->description;
    }

    public function all(Request $request){
        $f=store::orderBy('id','DESC')->get();
        return $f;
    }

    public function edit(Request $request,$id){
        $f=store::find($id);
        return $f;
    }



    ///MANAGMENT ANNES

    public function annexstore(Request $request){
        $validator=Validator::make($request->all(),[
         'name'=>'required',
        'description'=> 'required',
        'phone'=>"required",    
        'street'=>"required",   
         'state'=>"required",   
          'store'=>"required", 
          'city'=>"required", 
        ]);

        if($validator->fails()){
           return response()->json(['status'=>422,'errors'=>$validator->errors()]);
        }
        else{
           $phone=$request->phone;
            $n=$request->store;
            $s=$request->state;
            $f=new annex();
            $f->annexnumber=$this->getLastcode();
            $f->name2=$request->name;
            $f->description=$request->description;
            $f->zip=$request->zip;
            $f->street=$request->street;
            $f->city=$request=$request->city;
            $f->state=$s;
            $f->phone=$phone;
            $f->store_id=$n;
            $f->save();
           return response()->json(['status'=>200,'message'=>'ok']);

             
        }
    }


    public function getLastcode(){
        $code="";
        $function=annex::orderBy('id','DESC')->limit(1)->first();
        if($function && !empty($function->id)){
            $code=$function->id+1;
          
        }else{
            $code=1;
        }
        return $code;
    }

    public function allannex(Request $request){
        $annex=annex::with('store')->get();
        return $annex;
    }

    public function deleteannex(Request $request,$id){
        return annex::where('id',$id)->delete();
    }

    public function deletestore(Request $request,$id){
        return store::where('id',$id)->delete();
    }

    public function updateannexstore(Request $request,$id){
           $phone=$request->phone;
            $f=annex::find($id);
            $n=$request->store;
            $s=$request->state;
            $f->name2=$request->name;
            $f->description=$request->description;
            $f->zip=$request->zip;
            $f->street=$request->street;
            $f->city=$request=$request->city;
            $f->state=$s;
            $f->phone=$phone;
            $f->store_id=$n;
            $f->update();
           return response()->json(['status'=>200,'message'=>'ok']);

             
        
    }



}
