import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          SaaS App
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <button onClick={() => navigate('/')} className="hover:text-blue-200">Home</button>
          {isAuthenticated ? (
            <>
              <span className="text-blue-100">Welcome, {user?.name || 'User'}</span>
              {user?.role === 'admin' && (
                <button onClick={() => navigate('/admin')} className="hover:text-blue-200">Admin Dashboard</button>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="hover:text-blue-200">Login</button>
              <button onClick={() => navigate('/register')} className="hover:text-blue-200">Register</button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2">
          <button onClick={() => navigate('/')} className="block py-2 hover:text-blue-200">Home</button>
          {isAuthenticated ? (
            <>
              <div className="py-2 text-blue-100">Welcome, {user?.name || 'User'}</div>
              {user?.role === 'admin' && (
                <button onClick={() => navigate('/admin')} className="block py-2 hover:text-blue-200">Admin Dashboard</button>
              )}
              <button
                onClick={handleLogout}
                className="block py-2 w-full text-left bg-red-600 px-3 py-2 rounded hover:bg-red-700 transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="block py-2 hover:text-blue-200">Login</button>
              <button onClick={() => navigate('/register')} className="block py-2 hover:text-blue-200">Register</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;