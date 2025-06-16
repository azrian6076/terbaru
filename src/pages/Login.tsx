import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role) {
      navigate(`/${currentUser.role}`);
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'mahasiswa', email: 'student@example.com', color: 'bg-blue-100 text-blue-800' },
    { role: 'dosen', email: 'lecturer@example.com', color: 'bg-green-100 text-green-800' },
    { role: 'program studi', email: 'prodi@example.com', color: 'bg-purple-100 text-purple-800' },
    { role: 'industri', email: 'industry@example.com', color: 'bg-yellow-100 text-yellow-800' },
    { role: 'admin', email: 'admin@example.com', color: 'bg-red-100 text-red-800' }
  ];

  const setDemoAccount = (email: string) => {
    setUsername(email.split('@')[0]);
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      {error && (
        <motion.div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="flex justify-between text-sm text-teal-600 mt-4">
        <a href="#" className="hover:underline">Forgot Password?</a>
        <Link to="/register" className="hover:underline">Create Account</Link>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <FaGoogle className="text-xl text-gray-600 hover:text-red-500 cursor-pointer" />
        <FaFacebook className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        <FaLinkedin className="text-xl text-gray-600 hover:text-blue-800 cursor-pointer" />
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Demo Accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {demoAccounts.map((account) => (
            <button
              key={account.role}
              onClick={() => setDemoAccount(account.email)}
              className={`py-1 px-2 rounded-md ${account.color} text-left transition hover:opacity-80`}
            >
              <span className="font-medium">{account.role}:</span> {account.email}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Password for all demo accounts: <code>password123</code>
        </p>
      </div>
    </div>
  );
};

export default Login;
