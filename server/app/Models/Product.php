<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',  // Termék képeinek URL-je
        'external_id',  // Külső API-ból származó egyedi azonosító
        'source',  // Az API vagy webhely neve, ahonnan a terméket lekérték
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
