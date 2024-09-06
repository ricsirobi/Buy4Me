import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';

function JoinFamily() {
  const [familyId, setFamilyId] = useState('');

  const handleJoinFamily = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/family/${familyId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire({
        icon: 'success',
        title: 'Joined family successfully',
      });

      setFamilyId('');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Join Family</h2>
        <form onSubmit={handleJoinFamily} className="space-y-4">
          <input
            type="text"
            placeholder="Family ID"
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            Join Family
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinFamily;
