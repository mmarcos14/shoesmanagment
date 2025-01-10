<?php

namespace App\Http\Controllers;

use App\Models\Adress;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\select;

class EmployeeController extends Controller
{
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'empcode'=>'required',
            'name'=>'required',
            'lastname'=>'required',
            'birthday'=>'required',
            'zip'=>'required',
            'street'=>'required',
            'city'=>'required',
            'state'=>'required',
            'functions'=>'required',
            'store'=>'required',
            
        ]);
        if($validator->fails())
        {
            return response()->json(['status'=>422,'errors'=>$validator->errors()]);
        }
        else{
            $emp=new Employee();
           $emp->empcode=$this->getLastEmployee();
            $emp->name=$request->name;
            $emp->lastname=$request->lastname;
            $emp->birthday=$request->birthday;
            $emp->date_register=date('y-m-d');
            $emp->function_id=$request->functions;
            $emp->storeannex_id=$request->store;
            $emp->save();
            $user=new User();
            $user->name=$request->name.'   '.$request->lastname;
            $user->employee_id=$emp->id;
            $user->email=$emp->empcode;
            $user->password=Hash::make($emp->empcode);
            $user->save();
            $adress=new Adress();
            $adress->employee=$emp->id;
            $adress->zip=$request->zip;
            $adress->street=$request->street;
            $adress->city=$request->city;
            $adress->state=$request->state;
            $adress->date_created=date('y-m-d');
            $adress->save();
            return response()->json(['status'=>200,'the employee has been saved successfully']);
        }
    }

    public function getLastEmployee(){
        $code="";
        $emp=Employee::orderBy('id','DESC')->limit(1)->first();
        if($emp && !empty($emp->empcode)){
            $ex=str_replace("Emp","",$emp->empcode);
            $increase=$ex+1;
            $string=str_pad($increase,4,0,STR_PAD_LEFT);
            $code="Emp".$string;
        }else{
            $code="Emp0001";
        }
        return $code;
    }

    public function all(Request $request){
        $emp= Employee::with(['function', 'address','store'])->get();
        return $emp;
    }


    public function RangeEmployee(Request $request,$id=0){
        $am=[];
        $results = Employee::with(['function', 'store'])
        ->whereNotNull('function_id')
        ->whereNotNull('storeannex_id')
        ->select('function_id', 'storeannex_id', DB::raw('COUNT(*) as employee_count'))
        ->groupBy('function_id', 'storeannex_id')
        ->get();
        foreach($results as $resultat){
            $am[]=$resultat;
        }
        
     
    return response()->json(['status'=>200,'Datas'=>$am]);

// Afficher les résultats
foreach ($results as $result) {
    echo "Fonction: " . $result->function->name . ", Magasin: " . $result->storeAnnex->name . ", Nombre d'employés: " . $result->employee_count . "\n";
}

    }

    public function edit(Request $request,$id){
        $employee=DB::table('employees')
        ->join('functions','functions.id','=','employees.function_id')
        ->join('annexes','employees.storeannex_id','=','annexes.id')->where('employees.id',$id)
        ->join('adresses','adresses.employee','=','employees.id')
        ->select('employees.*','functions.salary','functions.name as fn','annexes.name2 as nb','adresses.*')->first();
         return response()->json(['status'=>200,'employee'=>$employee]);
    }

    public function delete(Request $request,$id){
        $employee=DB::table('employees')
       ->where('employees.id','=',$id)->delete();
        return response()->json(['status'=>200,'message'=>'deleted succssfully']);
   }


public function update(Request $request,$id){
  DB::table("employees")
->where('employees.id','=',$id)
 ->update([
  'name'=>$request->name,
  'lastname'=>$request->lastname,
  'birthday'=>$request->birthday,
  'function_id'=>$request->functions,
  'storeannex_id'=>$request->store
 ]);
  DB::table('adresses')->join('employees','employees.id','=','adresses.employee')
    ->where('adresses.employee','=',$id)
    ->update([
        'employee'=>$id,
        'zip'=>$request->zip,
        'street'=>$request->street,
        'city'=>$request->city,
        'state'=>$request->state,
    ]);
 
    return response()->json(['status'=>200,'the employee has been updated successfully']);
  

    
}
}