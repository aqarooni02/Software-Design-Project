import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/HomeyLogo.png";
import { HomeIcon, ChartBarIcon, UsersIcon } from "@heroicons/react/24/outline"; // Import icons
import { useAuth } from "../hooks/useAuth";

export const NavBar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const parent = user == "parent"
  const childId = !parent ? user : null

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

 

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo and Title */}
        <div className="flex-shrink-0">
          <Link to="/profile-selection" className="flex items-center gap-2" replace onClick={logout}>
            <img src={logo} alt="Homey Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-800">Homey</span>
          </Link>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to={parent ? "/tasks" : `/child-tasks/${childId}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive(parent ? "/tasks" : `/child-tasks/${childId}`)
              ? "bg-gray-100"
              : ""
              } text-gray-800 hover:bg-gray-100 transition`}
            replace
          >
            <HomeIcon className="w-5 h-5" />
            My To Do
          </Link>
          <Link
            to="/shared-view"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive("/shared-view") ? "bg-gray-100" : ""
              } text-gray-800 hover:bg-gray-100 transition`}
            replace
          >
            <UsersIcon className="w-5 h-5" />
            Shared View
          </Link>
          {parent && (
            <Link
              to="/analytics-view"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive("/analytics-view") ? "bg-gray-100" : ""
                } text-gray-800 hover:bg-gray-100 transition`}
              replace
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