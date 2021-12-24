<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('sales')->insert([
                [
                    'shop_id' => 1,
                    'user_id' => 1,
                    'description' => "Sale Report 123456",
                    'report_date' => Carbon::now()->subDays(10),
                    'cash_amount' => 10.50,
                    'card_amount' => 5.75,
                    'online_transfer_amount' => 55.60,
                    'created_at' => Carbon::now(),
                ],
                [
                    'shop_id' => 1,
                    'user_id' => 1,
                    'description' => "Sale Report 123456",
                    'report_date' => Carbon::now()->subDays(9),
                    'cash_amount' => 10.50,
                    'card_amount' => 0,
                    'online_transfer_amount' => 55.60,
                    'created_at' => Carbon::now(),
                ],
                [
                    'shop_id' => 2,
                    'user_id' => 1,
                    'description' => "Sale Report 123456",
                    'report_date' => Carbon::now()->subDays(10),
                    'cash_amount' => 10.50,
                    'card_amount' => 0,
                    'online_transfer_amount' => 55.60,
                    'created_at' => Carbon::now(),
                ], [
                    'shop_id' => 2,
                    'user_id' => 1,
                    'description' => "Sale Report 123456",
                    'report_date' => Carbon::now()->subDays(9),
                    'cash_amount' => 0,
                    'card_amount' => 10.50,
                    'online_transfer_amount' => 55.60,
                    'created_at' => Carbon::now(),
                ],
            ]
        );
    }
}
