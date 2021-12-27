<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'expense_id',
        'name',
        'image_path',
    ];


    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

}
