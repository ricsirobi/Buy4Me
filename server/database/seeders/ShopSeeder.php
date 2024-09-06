<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //name address city
        //Tesco Pláza : Eger, Pláza
        //Tesco Nagy : Eger, Nagy
        //Coop Hadnagy : Eger, Hadnagy
        $first = new \App\Models\Shop();
        $first->name = 'Tesco Pláza';
        $first->city = 'Eger';
        $first->address = 'Pláza';
        $first->logo = 'tesco.png';
        $first->save();

        $second = new \App\Models\Shop();
        $second->name = 'Tesco Nagy';
        $second->city = 'Eger';
        $second->address = 'Nagy';
        $second->logo = 'tesco.png';
        $second->save();

        $third = new \App\Models\Shop();
        $third->name = 'Coop Hadnagy';
        $third->city = 'Eger';
        $third->address = 'Hadnagy';
        $third->logo = 'coop.png';
        $third->save();

    }
}
