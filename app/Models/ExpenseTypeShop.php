<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ExpenseTypeShop extends Pivot
{
    use HasFactory;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    public function expenseType()
    {
        return $this->belongsTo(ExpenseType::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

}
