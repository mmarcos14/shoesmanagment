<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class size extends Model
{
    use HasFactory;
    
    protected $guarded = []; 
    protected $with="sneaker";
    public function sneaker(){
        return $this->belongsTo(sneaker::class);
    }

    

    
}
