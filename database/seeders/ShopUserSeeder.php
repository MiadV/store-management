<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shop_user')->insert([
                [
                    'shop_id' => 1,
                    'user_id' => 1,
                    'created_at' => Carbon::now()
                ],
                [
                    'shop_id' => 1,
                    'user_id' => 2,
                    'created_at' => Carbon::now()
                ],
                [
                    'shop_id' => 2,
                    'user_id' => 1,
                    'created_at' => Carbon::now()
                ],
            ]
        );
    }
}
