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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      {/* Two-column full-screen layout */}
      <div className="flex w-full h-screen overflow-hidden">
        {/* Left side - Sign in form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8 relative">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-100 rounded-full blur-xl opacity-60"></div>
          
          <div className="glass w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-white bg-opacity-80 border border-white border-opacity-20 z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-900 mb-3 flex items-center justify-center">
                Welcome Back! <span className="ml-2 transform hover:rotate-12 transition-transform inline-block">👋</span>
              </h1>
              <p className="text-xl text-blue-600 font-light">
                Let's get back to your tasks
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-lg font-medium text-blue-800 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl bg-blue-50 border border-blue-100 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                    transition-all duration-300 text-blue-900 placeholder-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none"></div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-lg font-medium text-blue-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl bg-blue-50 border border-blue-100
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
                    transition-all duration-300 text-blue-900 placeholder-blue-400"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none"></div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-800 to-blue-900
                  text-white py-4 rounded-xl text-xl font-semibold 
                  hover:scale-102 active:scale-98 transition-all duration-300 transform 
                  shadow-lg hover:shadow-blue-500/30 border border-blue-700"
                >
                  Sign In
                </button>
              </div>

              <p className="text-center text-blue-900 pt-2">
                Don't have an account?{' '}
                <a
                  onClick={() => navigate('/signup', { replace: true })}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
          
          <div className="mt-6 text-sm text-blue-500 opacity-70">
            © 2025 Family Task Manager
          </div>
        </div>

        {/* Right side - Full height Image with overlay */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent z-10"></div>
          <img 
            src={login} 
            alt="Stylized green landscape with hut"
            className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
          />
          <div className="absolute bottom-10 left-10 text-white z-20 max-w-xs">
            <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">Organize Your Family Tasks</h2>
            <p className="text-white/80 drop-shadow-md">Keep everyone on track with our fun and easy task management system.</p>
          </div>
        </div>
      </div>
    </div>
  );
};