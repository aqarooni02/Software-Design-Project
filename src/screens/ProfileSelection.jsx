import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import characterBlue from "../assets/CharacterBlue.png";
import characterPink from "../assets/CharacterPink.png";
import characterAdd from "../assets/CharacterAdd.png";
import characterOrange from "../assets/CharacterOrange.png";
import { CloudsAndStars } from "../components/CloudsAndStars";
import { AddChild } from "../components/AddChild";

export const ProfileSelection = () => {
  const navigate = useNavigate();
  const [addingChild, setAddingChild] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const resolveImage = (theme) => {
    switch (theme) {
      case "pink": return characterPink;
      case "orange": return characterOrange;
    }
  }
  
  const loadChildren = useCallback(() => {
    const parentData = JSON.parse(localStorage.getItem("parent_data"));

    if (parentData == null) {
      const defaultData = { childrenIds: [], personalTasks: [] };
      localStorage.setItem("parent_data", JSON.stringify(defaultData));
      setChildren([]);
    } else {
      const loadedChildren = parentData.childrenIds
        .map((childId) => JSON.parse(localStorage.getItem(`child_${childId}`)))
        .filter(Boolean);
      setChildren(loadedChildren);
    }
  }, []);

  useEffect(() => {
    loadChildren();
  }, [loadChildren]);

  const handleSelect = (userId) => {
    console.log(userId)
    setSelectedProfile(userId);
    setTimeout(() => {
      if (userId === "parent") {
        navigate("/tasks", { replace: true }); // Parent's To Do view
      } else {
        navigate(`/child-tasks/${userId}`, { replace: true }); // Child pink To Do view
      }
    }, 300); // Small delay for animation effect
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a4b8c] via-[#90cdf4] to-white overflow-x-hidden perspective-1000">
      {/* Cloud background (same as Landing) */}
      <CloudsAndStars />

      {/* Main content */}
      {!addingChild ?
        <>
          <h1 className="text-5xl font-bold text-white  mb-12 relative animate-fade-in font-sans tracking-wide drop-shadow-md">
            Select Your Profile
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-12 overflow-y-auto max-h-dvh p-6 mb-4 [&::-webkit-scrollbar]:w-0">

            <div
              onClick={() => handleSelect("parent")}
              className={`cursor-pointer transform transition duration-300 hover:scale-110 flex flex-col items-center ${selectedProfile === "parent" ? "scale-110" : ""}`}
            >
              <div className="relative group">
                <div className={`absolute inset-0 bg-blue-300 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${selectedProfile === "parent" ? "opacity-50" : ""}`}></div>
                <img
                  src={characterBlue}
                  alt="Character Blue"
                  className="w-64 h-64 object-contain animate-float-slow relative z-10"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black opacity-10 rounded-full blur-sm"></div>
              </div>
              <p className="mt-6 text-center text-2xl font-bold text-white drop-shadow-sm">
                Parent
              </p>
            </div>
            
            {children.map((child, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(child.id)}
                  className={`cursor-pointer transform transition duration-300 hover:scale-110 flex flex-col items-center ${selectedProfile === child.id ? "scale-110" : ""}`}
                >
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-pink-300 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${selectedProfile === child.id ? "opacity-50" : ""}`}></div>
                    <img
                      src={resolveImage(child.theme)}
                      alt="Character"
                      className="w-64 h-64 object-contain animate-float-slow relative z-10"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black opacity-10 rounded-full blur-sm"></div>
                  </div>
                  <p className="mt-6 text-center text-2xl font-bold text-white drop-shadow-sm">
                    {child.name}
                  </p>
                </div>
              );
            })}
            
            <div
              onClick={() => setAddingChild(true)}
              className="cursor-pointer transform transition duration-300 hover:scale-110 flex flex-col items-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gray-300 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <img
                  src={characterAdd}
                  alt="Add Character"
                  className="w-64 h-64 object-contain animate-float-slow relative z-10"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-black opacity-10 rounded-full blur-sm"></div>
              </div>
              <p className="mt-6 text-center text-2xl font-bold text-gray-400 drop-shadow-sm">
                Add Child
              </p>
            </div>
          </div>
        </>
        :
        <AddChild cancelAdd={() => setAddingChild(false)} refreshChildren={loadChildren} />
      }

    </div>
  );
};