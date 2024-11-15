<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User();

        $user->name = "Administrador";
        $user->email = "admin@admin.com";
        $user->password = bcrypt("administrador@@@");
        $user->role = 0;
        $user->save();

        $user = new User();

        $user->name = "Técnico";
        $user->email = "tech@tech.com";
        $user->password = bcrypt("tech123@@@");
        $user->save();

        //User::factory(10)->create();
    }
}
