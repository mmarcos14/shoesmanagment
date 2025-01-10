<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class annex extends Model
{
    use HasFactory;

    public function store(){
        return $this->belongsTo(store::class,'store_id');
    }

    
    public function employees()
    {
        return $this->hasMany(Employee::class, 'storeannex_id');
    }






}
