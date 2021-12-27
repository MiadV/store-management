<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expense_type_shop_id')->constrained('expense_type_shop')->onDelete('restrict')->onUpdate("cascade");
            $table->foreignId('shop_id')->constrained('shops')->onDelete('restrict')->onUpdate("cascade");
            $table->foreignId('expense_type_id')->constrained('expense_types')->onDelete('restrict')->onUpdate("cascade");
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict')->onUpdate("cascade");
            $table->string('description', 255)->nullable();
            $table->date('report_date');
            $table->decimal('amount', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
