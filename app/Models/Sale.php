<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shop_id',
        'user_id',
        'description',
        'report_date',
        'cash_amount',
        'card_amount',
        'online_transfer_amount',
        'total_amount',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'cash_amount' => 'decimal:2',
        'card_amount' => 'decimal:2',
        'online_transfer_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    public function getTotalAmountAttribute()
    {
        return number_format($this->cash_amount + $this->card_amount + $this->online_transfer_amount, 2);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

}
