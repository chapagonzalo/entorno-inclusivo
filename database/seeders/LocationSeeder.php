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
        $location->name = 'Bloque 1,2 y 3';
        $location->save();
        $location = new Location();
        $location->name = 'Bloque 4';
        $location->save();
        $location = new Location();
        $location->name = 'Rectorado';
        $location->save();
        $location = new Location();
        $location->name = 'Biblioteca';
        $location->save();
        $location = new Location();
        $location->name = 'IMASL';
        $location->save();
        $location = new Location();
        $location->name = 'Aula';
        $location->save();
        $location = new Location();
        $location->name = 'Quincho';
        $location->save();
        $location = new Location();
        $location->name = 'CCT';
        $location->save();
    }
}
