<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseTypeShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expense_type_shop')->insert([
                [
                    'expense_type_id' => 1,
                    'shop_id' => 1,
                    'limit_amount' => 50.50,
                    'strict_limit' => 1,
                    "is_active" => 1,
                    'created_at' => Carbon::now()
                ],
                [
                    'expense_type_id' => 1,
                    'shop_id' => 1,
                    'limit_amount' => 100,
                    'strict_limit' => 0,
                    "is_active" => 0,
                    'created_at' => Carbon::yesterday()
                ],
                [
                    'expense_type_id' => 2,
                    'shop_id' => 1,
                    'limit_amount' => null,
                    'strict_limit' => 0,
                    "is_active" => 1,
                    'created_at' => Carbon::yesterday()
                ],
                [
                    'expense_type_id' => 3,
                    'shop_id' => 2,
                    'limit_amount' => null,
                    'strict_limit' => 0,
                    "is_active" => 1,
                    'created_at' => Carbon::yesterday()
                ],

            ]
        );
    }
}
