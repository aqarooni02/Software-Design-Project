import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/profile-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-screen">
        {/* Left side - Sign up form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
          <div className="glass w-full max-w-md p-8 rounded-3xl shadow-lg backdrop-blur-md bg-white">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center justify-center">
                Join Homey! <span className="ml-2 transform hover:rotate-12 transition-transform inline-block">🏠</span>
              </h1>
              <p className="text-xl text-blue-600">
                Create your account today
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-blue-800 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-blue-900 placeholder-blue-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-blue-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-blue-900 placeholder-blue-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-blue-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-blue-900 placeholder-blue-400"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl text-xl font-semibold hover:scale-105 active:scale-95 transition-all duration-300 transform shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>

              <p className="text-center text-blue-900">
                Already have an account?{' '}
                <a
                  onClick={() => navigate('/signin', { replace: true })}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>

          {/* Footer with copyright */}
          <div className="mt-6 text-center text-sm text-blue-500 opacity-70">
            © 2025 Family Task Manager
          </div>
        </div>

        {/* Right side - Full height Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={login}
            alt="Stylized green landscape with hut"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 text-white max-w-xs z-20">
            <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">Welcome to Homey</h2>
            <p className="text-white/90 drop-shadow-md">Join our community of organized families and make household management fun.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};
