<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'long_name', 'phone', 'specialty', 'license',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'foreign_key');
    }
}
