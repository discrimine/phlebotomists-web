<?php

use Illuminate\Database\Seeder;
use App\Models\RoleUser;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = RoleUser::firstOrNew(['user_id' => 1]);
        if (!$role->exists) {
            $role->fill([
                'user_id' => '1',
                'role_id' => '1',
            ])->save();
        }
    }
}
