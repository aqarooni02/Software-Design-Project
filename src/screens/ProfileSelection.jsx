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
    if (userId === "parent") {
      navigate("/tasks", { replace: true }); // Parent's To Do view
    } else {
      navigate(`/child-tasks/${userId}`, { replace: true }); // Child pink To Do view
    }
 
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a4b8c] via-[#90cdf4] to-white overflow-x-hidden ">
      {/* Cloud background (same as Landing) */}
      <CloudsAndStars />

      {/* Main content */}
      {!addingChild ?
        <>
          <h1 className="text-4xl text-black mb-10 relative ">
            Select Your Profile
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-12 overflow-y-auto max-h-dvh p-4 mb-4 [&::-webkit-scrollbar]:w-0">

            <div
              onClick={() => handleSelect("parent")}
              className="cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <img
                src={characterBlue}
                alt="Character Blue"
                className="w-[16rem] h-[16rem] object-contain animate-float-slow"
              />
              <p className="mt-4 text-center text-2xl font-poppins text-black">
                Parent
              </p>
            </div>
            {children.map((child, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleSelect(child.id)}
                  className="cursor-pointer transform transition duration-300 hover:scale-110"
                >
                  <img
                    src={resolveImage(child.theme)}
                    alt="Character"
                    className="w-[16rem] h-[16rem] object-contain animate-float-slow"
                  />
                  <p className="mt-4 text-center text-2xl font-poppins text-black">
                    {child.name}
                  </p>
                </div>
              );
            })}
            <div
              onClick={() => setAddingChild(true)}
              className="cursor-pointer transform transition duration-300 hover:scale-110"
            >
              <img
                src={characterAdd}
                alt="Add Character"
                className="w-[16rem] h-[16rem] object-contain animate-float-slow"
              />
              <p className="mt-4 text-center text-2xl font-poppins text-black">
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