import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';

function CreateFamily() {
  const [name, setName] = useState('');

  const handleCreateFamily = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/family/create`, { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire({
        icon: 'success',
        title: 'Family created successfully',
        text: `Family: ${response.data.family.name}`
      });

      setName('');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Create Family</h2>
        <form onSubmit={handleCreateFamily} className="space-y-4">
          <input
            type="text"
            placeholder="Family Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            Create Family
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateFamily;
