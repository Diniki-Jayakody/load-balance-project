import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApis';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

 
  const handleRegister = async (e) => {
  e.preventDefault(); 

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    setSuccess('');
    return;
  }

  try {
    const response = await register(name.trim(), email.trim(), password.trim());
    setSuccess(response.data); 
    setError('');
    alert('Successfully Registered!')
    navigate('/'); 
  } catch (error) {
    setError('Registration failed');
    setSuccess('');
  }
};

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>
        <form onSubmit={handleRegister} className="mt-6">
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
          Email Address
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
          placeholder="Create a password"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Register
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="/" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
