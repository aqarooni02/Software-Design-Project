import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/HomeyLogo.png";
import { HomeIcon, ChartBarIcon, UsersIcon } from "@heroicons/react/24/outline"; // Import icons

export const NavBar = ({ parent, childType, childId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Determine the correct "My To Do" link based on user type
  const getMyToDoLink = () => {
    if (parent) {
      return "/tasks";
    } else if (childId) {
      return `/child-tasks/${childId}`;
    }
    return "/profile-selection";
  };

  // Handle navigation to shared view with user context
  const handleSharedViewClick = () => {
    navigate('/shared-view', { 
      state: { 
        isParent: parent,
        childId: childId
      }
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center gap-2">
          <Link to="/profile-selection" className="flex items-center gap-2">
            <img src={logo} alt="Homey Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-800">Homey</span>
          </Link>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to={getMyToDoLink()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isActive(getMyToDoLink()) ? "bg-gray-100" : ""
            } text-gray-800 hover:bg-gray-100 transition`}
          >
            <HomeIcon className="w-5 h-5" />
            My To Do
          </Link>
          <button
            onClick={handleSharedViewClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isActive("/shared-view") ? "bg-gray-100" : ""
            } text-gray-800 hover:bg-gray-100 transition`}
          >
            <UsersIcon className="w-5 h-5" />
            Shared View
          </button>
          {parent && (
            <Link
              to="/analytics-view"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive("/analytics-view") ? "bg-gray-100" : ""
              } text-gray-800 hover:bg-gray-100 transition`}
            >
              <ChartBarIcon className="w-5 h-5" />
              Analytics
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};