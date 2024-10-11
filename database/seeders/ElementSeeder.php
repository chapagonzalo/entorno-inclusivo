<?php

namespace Database\Seeders;

use App\Models\Element;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ElementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $element = new Element();
        $element->name = 'Escalera';
        $element->save();
        $element = new Element();
        $element->name = 'Rampa';
        $element->save();
        $element = new Element();
        $element->name = 'Señaletica';
        $element->save();
        $element = new Element();
        $element->name = 'Puerta';
        $element->save();
        $element = new Element();
        $element->name = 'Sanitario';
        $element->save();
    }
}
