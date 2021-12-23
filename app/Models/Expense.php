<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;


    public function expenseRule()
    {
        return $this->belongsTo(ExpenseTypeShop::class,'expense_type_shop_id');
    }
}
