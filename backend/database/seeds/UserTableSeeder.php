<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    function str_random($length = 16)
    {
        return Str::random($length);
    }

    public function run()
    {
        if (User::count() == 0) {
            //$role = Role::where('name', 'admin')->firstOrFail();

            $user = User::create([
                'name'           => 'Admin',
                'login'           => 'Admin',
                'email'          => 'admin@admin.com',
                'password'       => bcrypt('password'),
                'remember_token' => $this->str_random(60),
            ]);
            $user->assignRole('admin');
        }
    }
}
