<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\sneaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'sku'=>'required',
            'cname'=>'required',
            'cdescription'=>'required'
        ]);
        if($validator->fails()){
            return response()->json(['status'=>402,'errors'=>$validator->errors()]);
        }else{
            $category=new category();
            $category->sku=$request->sku;
            $category->cname=$request->cname;
            $category->cdescription=$request->cdescription;
            $category->save();
            return response()->json(['status'=>200,'message'=>'done']);

        }
    }

    public function all(Request $request){
        $categories =category::all();
        return $categories;
    }

    public function edit(Request $request,$id){
        $categories = category::find($id);
        return $categories;
    }

    public function update(Request $request,$id){
        $category = category::find($id);
        $category->cname=$request->cname;
        $category->cdescription=$request->cdescription;
        $category->update();
        return response()->json(['status'=>200,'message'=>'done']);
        return $categories;
    }

    public function delete(Request $request,$id){
      return   category::where('id',$id)->delete();
    }
}
