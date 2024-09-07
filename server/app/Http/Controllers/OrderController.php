<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
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
        //ha még nincs ilye ntermék a megadott névvel akkor hozzáadja

        $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer',
        ]);

        $product = Product::firstOrCreate([
            'name' => $request->name,
        ]);
        OrderItem::create([
            'order_id' => $orderId,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Product added successfully', 'product' => $product]);
    }


    // Rendelések listázása
    public function getOrdersByFamilyId()
    {
        $allFamily = auth()->user()->families;
        $familyIds = $allFamily->pluck('id')->toArray();
        //ezeket az ordereket a shop adataival együtt kell visszaadni
        //$orders = Order::whereIn('family_id', $familyIds)->get();
        //de a family-t is hozzá kell adni 1-1 adathoz
        $orders = Order::with('shop')->whereIn('family_id', $familyIds)->get();
        $data = [];
        foreach ($orders as $order) {
            $data[] = [
                'order' =>$order,
                'shop' => $order->shop,
                'family' => $order->family,
                'products' => $order->products,
            ];
        }
        return response()->json($data);
    }
}
