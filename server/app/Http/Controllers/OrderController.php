<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Rendelés létrehozása
    public function create(Request $request)
    {
        $request->validate([
            'store_id' => 'required|integer|max:255',
            'shopping_time' => 'required|date',
            'family_id' => 'required|exists:families,id',
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'shop_id' => $request->store_id,
            'expected_shopping_time' => $request->shopping_time,
            'family_id' => $request->family_id,  // Család ID hozzárendelése
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }


    // Termék hozzáadása a rendeléshez
    public function addProduct(Request $request, $orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $product = Product::create([
            'name' => $request->name,
            'quantity' => $request->quantity,
        ]);

        $order->products()->attach($product->id);

        return response()->json(['message' => 'Product added successfully']);
    }

    // Rendelések listázása
    public function index()
    {
        $orders = Order::with('products')->get();
        return response()->json($orders);
    }
}
