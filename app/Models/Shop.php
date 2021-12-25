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


    public function expenseTypes()
    {
        return $this->belongsToMany(ExpenseType::class)
            ->using(ExpenseTypeShop::class)
            ->withPivot(['id', 'limit_amount', 'strict_limit', 'is_active'])
            ->wherePivot('is_active', true)
            ->withTimestamps();
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->where('is_active', true);;
    }
}

