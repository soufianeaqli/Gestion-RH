<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Congees extends Model
{
    use HasFactory;
    protected $table = 'congees'; 
    protected $fillable = ['employee', 'type', 'startDate', 'endDate', 'status', 'duree'];  // 'duree' sans accent
  
}
