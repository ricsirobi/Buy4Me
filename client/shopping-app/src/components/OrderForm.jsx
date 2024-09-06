import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';  // Megjegyezve a config helyes importja

function OrderForm() {
  const [store, setStore] = useState(null);
  const [shoppingTime, setShoppingTime] = useState('');
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [shops, setShops] = useState([]);

  // Családok lekérése
  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/user/families`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const familyOptions = response.data.map((family) => ({
          value: family.id,
          label: family.name,
        }));
        setFamilies(familyOptions);
      } catch (error) {
        console.error('Error fetching families', error);
      }
    };

    // Shopok lekérése
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/shops`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const shopOptions = response.data.map((shop) => ({
          value: shop.id,
          label: `${shop.name} (${shop.city}, ${shop.address})`,
        }));
        setShops(shopOptions);
      } catch (error) {
        console.error('Error fetching shops', error);
      }
    };

    fetchFamilies();
    fetchShops();
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFamily || !store) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a family and a store',
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/orders/create`, {
        store_id: store.value,
        shopping_time: shoppingTime,
        family_id: selectedFamily.value,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Order created successfully',
        text: `You plan to shop at shop ID: ${response.data.order.shop_id} for your family ID: ${response.data.order.family_id} at ${new Date(response.data.order.expected_shopping_time).toLocaleString()}`,
      });
      

      setStore(null);
      setShoppingTime('');
      setSelectedFamily(null);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Order</h2>
        <form onSubmit={handleOrderSubmit} className="space-y-4">
          <Select
            options={shops}
            value={store}
            onChange={(selectedOption) => setStore(selectedOption)}
            placeholder="Select Store"
            isClearable
            isSearchable
          />
          <input
            type="datetime-local"
            placeholder="Shopping Time"
            value={shoppingTime}
            onChange={(e) => setShoppingTime(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Select
            options={families}
            value={selectedFamily}
            onChange={(selectedOption) => setSelectedFamily(selectedOption)}
            placeholder="Select Family"
            isClearable
            isSearchable
          />
          <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
