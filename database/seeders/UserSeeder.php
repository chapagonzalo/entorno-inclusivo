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
        
        User::query()->delete();
        
        $user = new User();
        $user->name = "Mariela Zuñiga";
        $user->email = "marielagood@gmail.com";
        $user->password = bcrypt("123Mariela456");
        $user->role = 0;
        $user->save();

        $user = new User();
        $user->name = "Gonzalo Schiappapietra";
        $user->email = "chapa.gonzalo@gmail.com";
        $user->password = bcrypt("123Gonzalo456");
        $user->role = 0;
        $user->save();

        $user = new User();
        $user->name = "Técnico 1 UNSL - San Luis";
        $user->email = "tec1@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();
        $user = new User();
        $user->name = "Técnico 2 UNSL - San Luis";
        $user->email = "tec2@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();

        $user = new User();
        $user->name = "Técnico 1 UNSL - Villa Mercedes";
        $user->email = "tec1vm@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();
        $user = new User();
        $user->name = "Técnico 2 UNSL - Villa Mercedes";
        $user->email = "tec2vm@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();

        $user = new User();
        $user->name = "Técnico 1 UNSL - Merlo";
        $user->email = "tec1merlo@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();
        $user = new User();
        $user->name = "Técnico 2 UNSL - Merlo";
        $user->email = "tec2merlo@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 1;
        $user->save();

        $user = new User();
        $user->name = "Supervisor 1 UNSL - San Luis";
        $user->email = "sup1@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();
        $user = new User();
        $user->name = "Supervisor 2 UNSL - San Luis";
        $user->email = "sup2@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();

        $user = new User();
        $user->name = "Supervisor 1 UNSL - Villa Mercedes";
        $user->email = "sup1vm@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();
        $user = new User();
        $user->name = "Supervisor 2 UNSL - Villa Mercedes";
        $user->email = "sup2vm@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();

        $user = new User();
        $user->name = "Supervisor 1 UNSL - Merlo";
        $user->email = "sup1merlo@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();
        $user = new User();
        $user->name = "Supervisor 2 UNSL - Merlo";
        $user->email = "sup2merlo@unsl.edu.ar";
        $user->password = bcrypt("123456@@@");
        $user->role = 2;
        $user->save();

        //User::factory(10)->create();
    }
}
