<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Functions extends Model
{
    use HasFactory;
    
    public function employees()
    {
        return $this->hasMany(Employee::class, 'function_id'); // Relation inverse
    }
}

