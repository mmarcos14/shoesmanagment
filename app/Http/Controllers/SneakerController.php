<?php

namespace App\Http\Controllers;

use App\Models\image;
use App\Models\sneaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SneakerController extends Controller
{

    public function store(Request $request){
        $file=$request->file('photo');
        $file_name=rand(1,10).$file->getClientOriginalName();
        $file->move('images',$file_name);
        $sneaker=sneaker::create(['sku'=>$request->sku,'name'=>$request->name,'price'=>$request->price,'description'=>$request->description,'photo'=>$file_name, 'category'=>$request->category]);
        foreach($request->sizes as $size){
            $sneaker->sizes()->create($size);
        }
        return response()->json($sneaker->load('sizes'),201);
    }

    public function getSneaker(Request $request,$id){
        $sneaker = Sneaker::where('sku', $request->sku)
        ->with(['sizes' => function ($query) {
        $query->orderBy('size', 'asc'); // Trier par taille croissante
       }])
       ->with(['category' => function ($query) {
        $query->orderBy('cname', 'asc'); // Trier par taille croissante
       }])->first();
        return response()->json($sneaker);
    }

    public function getSneaker2(Request $request){
       $data=DB::table('sneakers')->join('sizes','sizes.sneaker_id','sneakers.id')
       ->where('sizes.size',$request->size)
       ->where('sneakers.sku',$request->sku)->first();
       if($data){
        return response()->json(['status'=>200,'da'=>$data]);
       }
       return response()->json(['status'=>402]);

    }

    public function catalogue(Request $request){
        $sneaker = Sneaker::with(['sizes' => function ($query) {
        $query->orderBy('size', 'asc'); // Trier par taille croissante
       }])
       ->with(['category' => function ($query) {
        $query->orderBy('cname', 'asc'); // Trier par taille croissante
       }])->get();
        return response()->json($sneaker);
    }

    public function storeimage(Request $request){
        //dd($request->photo);
        $image=new image();
        $image->title=$request->title;
        if($request->hasFile('photo')){
            $file=$request->file('photo');
            $file_name=rand(1,10).$file->getClientOriginalName();
            $file->move('images',$file_name);
            $image->name=$file_name;
        }
        $image->save();

    }

    public function getImage(){
        return image::orderBy('id','DESC')->get();
    }

}
