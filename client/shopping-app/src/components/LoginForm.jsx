import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom'; // Importáljuk a navigációhoz

function LoginForm() {

  //ha a localstorage tartalmazza a tokent akkor redirectálnunk kell a home oldalra
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/home';
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Használjuk a navigációhoz

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      // Token tárolása
      localStorage.setItem('token', response.data.access_token);

      // Sikeres üzenet
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: 'You are now logged in!',
      });

      // Navigáció a főoldalra
      navigate('/home');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.response?.data?.message || 'Invalid credentials',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
