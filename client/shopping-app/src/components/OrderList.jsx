import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import AddProductToOrder from './AddProductToOrder';

function OrderList() {
  const [orders, setOrders] = useState([]);

  // Rendelések lekérése
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 border p-4 rounded-lg">
          <h3 className="text-xl font-bold">{order.shop.name} - {order.expected_shopping_time}</h3>
          <p>Family: {order.family.name}</p>
          <p>Products:</p>
          <ul>
            {order.products?.map((product) => (
              <li key={product.id}>{product.name} ({product.quantity}) - {product.status}</li>
            ))}
          </ul>

          {/* Termék hozzáadása a rendeléshez */}
          <AddProductToOrder orderId={order.order.id} onProductAdded={fetchOrders} />
        </div>
      ))}
    </div>
  );
}

export default OrderList;
