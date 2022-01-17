<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ExpenseTypeShop extends Pivot
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'expense_type_id',
        'shop_id',
        'limit_amount',
        'strict_limit',
        'is_active',
    ];


    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'limit_amount' => 'decimal:2',
        'strict_limit' => 'boolean',
        'is_active' => 'boolean',
    ];


    public function expenseType()
    {
        return $this->belongsTo(ExpenseType::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

}
