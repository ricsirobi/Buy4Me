import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import CreateFamily from './components/CreateFamily';
import JoinFamily from './components/JoinFamily';
import FamilyMembers from './components/FamilyMembers';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  const token = localStorage.getItem('token');
  const familyId = 1;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-indigo-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl">Buy4Me</h1>
            <nav>
              <ul className="flex space-x-4">
                {!token ? (
                  <>
                    <li>
                      <Link to="/login" className="text-white hover:underline">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="text-white hover:underline">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Bejelentkezés */}
            <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/home" />} />

            {/* Regisztráció */}
            <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/home" />} />

            {/* Főoldal */}
            <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/family/create" element={token ? <CreateFamily /> : <Navigate to="/login" />} />
            <Route path="/family/join" element={token ? <JoinFamily /> : <Navigate to="/login" />} />
            <Route path="/family/members" element={token ? <FamilyMembers familyId={familyId} /> : <Navigate to="/login" />} />
            <Route path="/order/create" element={token ? <OrderForm /> : <Navigate to="/login" />} />
            <Route path="/orders" element={token ? <OrderList /> : <Navigate to="/login" />} />

            {/* Alapértelmezett útvonal */}
            <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 p-4 text-white text-center">
          <p>&copy; {new Date().getFullYear()} Family App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
