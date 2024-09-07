<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['family_id', 'shop_id', 'expected_shopping_time'];

    public function family()
    {
        return $this->belongsTo(Family::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function getProductsAttribute()
    {
        $products = [];
        foreach ($this->items as $item) {
            $productWithStatus = $item->product;
            $productWithStatus->status = $item->status;
            $productWithStatus->quantity = $item->quantity;
            $products[] = $productWithStatus;

        }
        return $products;
    }


}
