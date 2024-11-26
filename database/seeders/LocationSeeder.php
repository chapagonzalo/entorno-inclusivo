<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $location = new Location();
        $location->name = "1- Rectorado";
        $location->save();
        $location = new Location();
        $location->name = "2- Biblioteca";
        $location->save();
        $location = new Location();
        $location->name = "3- Bloque 1,2 y 3";
        $location->save();
        $location = new Location();
        $location->name = "4- Bloque 4";
        $location->save();
        $location = new Location();
        $location->name = "5- Aula";
        $location->save();
        $location = new Location();
        $location->name = "6- IMASL";
        $location->save();
        $location = new Location();
        $location->name = "7- CCT";
        $location->save();
    }
}
