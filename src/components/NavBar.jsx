import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/HomeyLogo.png';
import bell from '../assets/Bell.png';
import user from '../assets/User-Circle.png';

export const NavBar = ({ parent, childType = "pink" }) => {
  const bgClass = parent
    ? "bg-[#0151C2]"
    : childType === "orange"
    ? "bg-orange-500"
    : "bg-pink-500";

  return (
    <div className={`navbar ${bgClass} flex items-center justify-between px-3 py-2`}>
      <div className="flex gap-8">
        <Link to="/profile-selection">
          <img src={logo} className="max-h-10" alt="Homey Logo" />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={parent ? "/tasks" : "/child-tasks"} className="text-white">
            My To Do
          </Link>
          <Link to="/shared-view" className="text-white">
            Shared View
          </Link>
          {parent && (
            <Link to="/analytics-view" className="text-white">
              Analytics
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mx-4">
        <img src={bell} className="max-h-10" alt="Notifications" />
        <img src={user} className="max-h-10" alt="User Profile" />
      </div>
    </div>
  );
};