<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     */
    public function run()
    {
        $role = Role::firstOrNew(['name' => 'admin']);
        if (!$role->exists) {
            $role->fill([
                'name' => 'admin',
            ])->save();
        }

        $role = Role::firstOrNew(['name' => 'small_admin']);
        if (!$role->exists) {
            $role->fill([
                'name' => 'small_admin',
            ])->save();
        }

        $role = Role::firstOrNew(['name' => 'doctor']);
        if (!$role->exists) {
            $role->fill([
                'name' => 'doctor',
            ])->save();
        }

        $role = Role::firstOrNew(['name' => 'phlebotomist']);
        if (!$role->exists) {
            $role->fill([
                'name' => 'phlebotomist',
            ])->save();
        }
    }
}
