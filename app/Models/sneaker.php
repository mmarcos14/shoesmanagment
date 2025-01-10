<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sneaker extends Model
{
    use HasFactory;
    protected $table="sneakers";
    protected $guarded = []; 

    public function sizes(){
        return $this->hasMany(size::class);
    }

    public function category()
    {
        return $this->belongsTo(category::class);
    }
}
