<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expense_types')->insert([
                [
                    'title' => 'tm bill',
                    'accountant_only' => true,
                    'created_at' => Carbon::now()
                ],
                [
                    'title' => 'cleaning',
                    'accountant_only' => false,
                    'created_at' => Carbon::now()
                ],
                [
                    'title' => 'transportation',
                    'accountant_only' => false,
                    'created_at' => Carbon::now()
                ],

            ]
        );
    }
}
