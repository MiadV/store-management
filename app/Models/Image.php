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

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['full_path'];


    public function getFullPathAttribute()
    {
        return asset("{$this->image_path}{$this->name}");
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

}
