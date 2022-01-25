<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'uploaded_by',
        'expense_id',
        'name',
        'extension',
        'image_path',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['full_path', 'thumbnail'];


    public function getFullPathAttribute()
    {
        return asset("{$this->image_path}{$this->name}.{$this->extension}");
    }

    public function getThumbnailAttribute()
    {
        return asset("{$this->image_path}{$this->name}_thumbnail.{$this->extension}");
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

}
