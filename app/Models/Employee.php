<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    public function function()
    {
        return $this->belongsTo(Functions::class, 'function_id'); // Clé étrangère
    }

    public function store(){
        {
            return $this->belongsTo(annex::class, 'storeannex_id'); // Clé étrangère
        }
       }

    public function address()
    {
        return $this->hasOne(Adress::class, 'employee'); // Clé étrangère
    }

 
}
