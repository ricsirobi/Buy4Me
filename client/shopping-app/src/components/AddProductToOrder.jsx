import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';

function AddProductToOrder({ orderId, onProductAdded }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/orders/${orderId}/add-product`, {
        name: productName,
        quantity,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Product added successfully',
      });

      // Termék hozzáadása után frissítjük a rendelést
      onProductAdded();
      setProductName('');
      setQuantity(1);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="mt-4">
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 mt-4">
        Add Product
      </button>
    </form>
  );
}

export default AddProductToOrder;
