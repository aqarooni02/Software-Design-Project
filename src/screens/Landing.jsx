// I used the cloud animation idea from: https://codepen.io/Blando/pen/xGdLgQ
// But I gave the clouds a different  look while keeping the same animation concept

import React from 'react';
import { useNavigate } from 'react-router-dom';
import characterBlue from '../assets/CharacterBlue.png';
import { CloudsAndStars } from '../components/CloudsAndStars';

export const Landing = () => {
  const navigate = useNavigate();

  // When the 'Get Started button is clicked:
  // 1. Create a star burst animation (will chnge later to actual starsor star emojis)
  // 2. Wait for a few secs before moving to another page
  // 3. Then take the user to sign in
  const handleGetStarted = (e) => {
    createStarBurst(e);
    setTimeout(() => {
      navigate('/signin');
    }, 300);
  };

  // burst of stars when clicking the button
  const createStarBurst = (e) => {
    // Figure out where the button is on the screen
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Create a container for our star burst
    const burst = document.createElement('div');
    burst.className = 'star-burst';
    burst.style.left = `${rect.left + rect.width / 2}px`;
    burst.style.top = `${rect.top + rect.height / 2}px`;

    // Create 20 little star particles that shoot out in different directions
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'star-particle';

      // Make each particle go in a random direction
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const velocity = 100 + Math.random() * 150;

      particle.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
      particle.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
      particle.style.animation = 'burst 0.8s ease-out forwards';

      burst.appendChild(particle);
    }

    // Add the burst to the page and clean it up after animation
    document.body.appendChild(burst);
    setTimeout(() => document.body.removeChild(burst), 1000);
  };

  return (
    // Main wrapper with gradient background
    <div className="h-dvh flex items-center justify-center relative overflow-x-hidden bg-gradient-to-b from-[#1a4b8c] via-[#90cdf4] to-white">
      {/*  sky with  clouds and stars */}
      <CloudsAndStars/>

      {/* Main content container */}
      <div className="max-w-8xl w-full mx-auto flex items-center justify-center px-4 sm:px-8 relative z-20 mt-24">
        {/* Content wrapper */}
        <div className="flex items-center justify-center gap-20"> {/* Added gap between content and character */}
          {/* Left content section - CHNAGEE: Made wider */}
          <div className="max-w-5xl glass p-12 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="flex flex-col space-y-12">
              {/* Title section */}
              <div className="text-center"> 
                <h1 className="text-6xl sm:text-8xl font-bold text-blue-900">
                  Welcome to
                  <span className="bg-gradient-to-r from-blue-600 via-pink-500 to-orange-500 text-transparent bg-clip-text block mt-4">
                    HOMEY
                  </span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-white leading-relaxed text-center max-w-3xl mx-auto">
                Keep your household running smoothly with an easy-to-use task manager designed for families.
              </p>

              {/* Feature grid - Improved layout */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" className="text-blue-500" strokeWidth="2" />
                        <path d="M9 12l2 2 4-4" className="text-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    color: "blue",
                    title: "Task Management",
                    text: "Assign and track household tasks with ease"
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" className="text-pink-500" strokeWidth="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" className="text-pink-500" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                    color: "pink",
                    title: "Shared Calendar",
                    text: "Keep everyone on the same page"
                  },
                  {
                    icon: (
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" className="text-orange-500" strokeWidth="2" />
                        <path d="M12 8v8M8 12h8" className="text-orange-500" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                    color: "orange",
                    title: "Reward System",
                    text: "Earn points for completed tasks!"
                  }
                ].map((feature, index) => (
                  <div key={index}
                    className="flex flex-col items-center gap-4 p-8 bg-white/15 rounded-2xl backdrop-blur-sm
                    border border-white/20 hover:bg-white/25 transition-all duration-300 hover:scale-105 shadow-xl">
                    <div className={`bg-${feature.color}-500/15 p-4 rounded-full flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900">{feature.title}</h3>
                    <p className="text-lg text-blue-800/80 text-center">{feature.text}</p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 via-pink-500 to-orange-500 text-white 
                px-10 sm:px-20 py-5 sm:py-7 rounded-full text-2xl sm:text-3xl font-semibold 
                hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 
                shadow-2xl border border-white/20 hover:shadow-pink-500/20 mx-auto w-2/3"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right character section */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 to-transparent rounded-full filter blur-3xl"></div>
            <img
              src={characterBlue}
              alt="Homey Character"
              className="w-[72rem] h-[72rem] object-contain animate-float relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* glowing effects in the background */}
      {/* <div className="absolute right-0 bottom-0 w-[36rem] h-[36rem] bg-gradient-shine 
        rounded-full transform translate-x-1/4 translate-y-1/4 opacity-5 blur-3xl animate-pulse"></div>
      <div className="absolute left-0 top-0 w-[32rem] h-[32rem] bg-gradient-shine 
        rounded-full transform -translate-x-1/4 -translate-y-1/4 opacity-5 blur-3xl animate-pulse"></div> */}
    </div>
  );
};

export default Landing;