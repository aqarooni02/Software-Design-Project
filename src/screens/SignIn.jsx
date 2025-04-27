import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/profile-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Two-column full-screen layout */}
      <div className="flex w-full h-screen">
        {/* Left side - Sign in form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="glass w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-900 mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-xl text-blue-700">
                Let's get back to your tasks
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-blue-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300 text-blue-900 placeholder-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-blue-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300 text-blue-900 placeholder-blue-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900
                text-white py-4 rounded-xl text-xl font-semibold 
                hover:scale-105 transition-all duration-300 transform 
                shadow-xl hover:shadow-blue-500/20 border border-white/20"
              >
                Sign In
              </button>

              <p className="text-center text-blue-900">
                Don't have an account?{' '}
                <a
                  onClick={() => navigate('/signup', { replace: true })}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right side - Full height Image */}
        <div className="hidden md:block w-1/2">
          <img 
            src={login} 
            alt="Stylized green landscape with hut"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
