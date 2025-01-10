<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class store extends Model
{
    use HasFactory;

    public function store()
    {
        return $this->belongsTo(annex::class, 'storeannex_id'); // Clé étrangère
    }
    
}
