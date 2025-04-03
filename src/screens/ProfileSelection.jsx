import React from "react";
import { useNavigate } from "react-router-dom";
import characterBlue from "../assets/CharacterBlue.png";
import characterPink from "../assets/CharacterPink.png";
import characterOrange from "../assets/CharacterOrange.png";

export const ProfileSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (character) => {
    if (character === "blue") {
      navigate("/tasks"); // Parent's To Do view
    } else if (character === "pink") {
      navigate("/child-tasks"); // Child pink To Do view
    } else if (character === "orange") {
      navigate("/child-tasks-orange"); // Navigate to the orange child view
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a4b8c] via-[#90cdf4] to-white overflow-x-hidden ">
      {/* Cloud background (same as Landing) */}
      <div className="cloudPane absolute inset-0">
        {/* Stars in the sky */}
        <div className="stars absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="star" id={`star${i + 1}`}></div>
          ))}
        </div>
        {/* Clouds */}
        {[1, 2, 3, 4, 5, 6, 7].map((cloudNum) => (
          <div key={cloudNum} className="bigCloud" id={`cloud${cloudNum}`}>
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <h1 className="text-5xl text-white mb-10 relative ">
        Select Your Profile
      </h1>
      <div className="flex flex-col max-h-dvh md:flex-row gap-12 overflow-y-auto [&::-webkit-scrollbar]:w-0 p-4 mb-4 ">
        <div
          onClick={() => handleSelect("blue")}
          className="cursor-pointer transform transition duration-300 hover:scale-110"
        >
          <img
            src={characterBlue}
            alt="Character Blue"
            className="w-[24rem] h-[24rem] object-contain animate-float-slow"
          />
          <p className="mt-4 text-center text-2xl font-semibold text-blue-900">
            Parent
          </p>
        </div>

        <div
          onClick={() => handleSelect("pink")}
          className="cursor-pointer transform transition duration-300 hover:scale-110"
        >
          <img
            src={characterPink}
            alt="Character Pink"
            className="w-[24rem] h-[24rem] object-contain animate-float-slow"
          />
          <p className="mt-4 text-center text-2xl font-semibold text-pink-900">
            Child 1
          </p>
        </div>

        <div
          onClick={() => handleSelect("orange")}
          className="cursor-pointer transform transition duration-300 hover:scale-110"
        >
          <img
            src={characterOrange}
            alt="Character Orange"
            className="w-[24rem] h-[24rem] object-contain animate-float-slow"
          />
          <p className="mt-4 text-center text-2xl font-semibold text-orange-900">
            Child 2
          </p>
        </div>
      </div>
    </div>
  );
};