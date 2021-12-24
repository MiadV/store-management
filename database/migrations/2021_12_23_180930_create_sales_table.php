<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->onDelete('restrict')->onUpdate("cascade");
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict')->onUpdate("cascade");
            $table->string('description',255)->nullable();
            $table->date('report_date');
            $table->decimal('cash_amount', 10, 2)->default(0);
            $table->decimal('card_amount', 10, 2)->default(0);
            $table->decimal('online_transfer_amount', 10, 2)->default(0);
            $table->timestamps();

            // One shop can have only ONE sale report per date.
            $table->Unique(['report_date', 'shop_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
