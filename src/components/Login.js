import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApis';


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(null); // State for success message
  const [error, setError] = useState(null); // State

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await login(email, password);
      setSuccess(response.message); // Set success message
      setError(null);
      navigate('/landing')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setSuccess(null); // Clear any previous success messages
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>
            <form onSubmit={handleLogin} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
