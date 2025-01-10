<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
      public function store(Request $request){
    //dd($request->sizes);
    dd($request->value);


     /**  $validator=Validator::make($request->all(),[
            'namep'=>'required',
            'descriptionp'=>'required',
            'pricep'=>'required',
            'category_id'=>'required'

        ]);
        if($validator->fails()){
            return response()->json(['status'=>402,'errors'=>$validator->errors()]);
        }else{
            $product=new product();
            $product->namep=$request->namep;
            $product->descriptionp=$request->descriptionp;
            $product->pricep=$request->pricep;
            $product->category_id=$request->category_id;
            $product->save();
            return response()->json(['status'=>200,'message'=>'done']);

        }**/
    }
}
