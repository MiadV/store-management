<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'address',
        'is_active',
    ];


    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function expenseTypes()
    {
        return $this->belongsToMany(ExpenseType::class)
            ->withPivot('limit_amount')
            ->withTimestamps()
            ->as("expense_types");
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}

