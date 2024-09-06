import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL+'register', {
        name,
        email,
        password,
      });

      // Ha sikeres a regisztráció, megjelenik a SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: `Welcome, ${response.data.user.username}!`,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
