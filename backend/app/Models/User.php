<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role(){
        return $this->belongsTo('App\Models\Role');
    }

    public function roles() {
        return $this->belongsToMany('App\Models\Role', 'role_user');
    }

    public function roles_all(){
        $this->loadRolesRelations();

        return collect([$this->role])->merge($this->roles);
    }

    public function hasRole($name){
        $roles = $this->roles_all()->pluck('name')->toArray();

        foreach ((is_array($name) ? $name : [$name]) as $role) {
            if (in_array($role, $roles)) {
                return true;
            }
        }

        return false;
    }

    public function isRole(){
        $this->loadRolesRelations();
        $role = $this->roles->first();
        $this->unsetRelation('roles');
        return $role->name;
    }

    public function isDoctor(){
        return $this->hasRole('doctor');
    }

    private function loadRolesRelations(){
        if (!$this->relationLoaded('roles')) {
            $this->load('roles');
        }
    }

    public function phlebotomists() {
        return $this->hasOne('App\Models\Phlebotomist');
    }

    public function doctors() {
        return $this->hasOne('App\Models\Doctor');
    }

    public function orders() {
        return $this->belongsToMany('App\Models\Order');
    }

    public function assignRole($role)
    {
        return $this->roles()->sync(
            [Role::whereName($role)->firstOrFail()->id]
        );
    }
}
