<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phlebotomist extends Model
{
    public $table = "phlebotomist";

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
