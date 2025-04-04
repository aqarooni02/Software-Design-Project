// sign up for new users

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  // Keep track of the new user's info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // check: might fix the routing
  // 1. prevent the page from refreshing
  // 2. take the user to their tasks (will chnage to the profile selection)
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/profile-selection');
  };

  return (
    // Same  background as our other pages
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#1a4b8c] via-[#90cdf4] to-white">
      {/* Rainbow background */}
      <div className="rainbow-background">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="rainbow-stripe" />
        ))}
        <div className="glow-overlay" />
        <div className="blur-overlay" />
      </div>

      {/* Main content box with our signature glass look */}
      <div className="max-w-md w-full mx-8 relative z-10">
        <div className="glass p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          {/* Warm welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Join Homey! 🏠
            </h1>
            <p className="text-xl text-blue-700">
              Create your account today
            </p>
          </div>

          {/* Sign up form with animations */}
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Name input */}
            <div>
              <label className="block text-lg font-medium text-blue-900 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                transition-all duration-300 text-blue-900 placeholder-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email input */}
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

            {/* Password input */}
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
                placeholder="Create a password"
                required
              />
            </div>

            {/* gradient button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-pink-500 to-orange-500 
              text-white py-4 rounded-xl text-xl font-semibold 
              hover:scale-105 transition-all duration-300 transform 
              shadow-xl hover:shadow-pink-500/20 border border-white/20"
            >
              Sign Up
            </button>

            {/* Link back to sign in */}
            <p className="text-center text-blue-900">
              Already have an account?{' '}
              <a
                onClick={() => navigate('/signin')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};