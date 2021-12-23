<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shops')->insert([
                [
                    'title' => 'shop A',
                    'address' => 'klklkl',
                    'created_at' => Carbon::now()
                ],
                [
                    'title' => 'shop B',
                    'address' => 'klklkl',
                    'created_at' => Carbon::now()
                ],
                [
                    'title' => 'shop C',
                    'address' => 'klklkl',
                    'created_at' => Carbon::now()
                ],
            ]
        );
    }
}
