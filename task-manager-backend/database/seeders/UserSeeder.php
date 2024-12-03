<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'user@test.com'], // Check for an existing record by email
            [
                'name' => 'Test User',
                'password' => bcrypt('password'), // Update or set new data
            ]
        );
    }
}
