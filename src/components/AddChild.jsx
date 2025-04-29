import React, { useState } from "react";
import { localStorageManager } from "../utils/localStorageManager";
// import { useNavigate } from "react-router-dom";

export const AddChild = ({ cancelAdd, refreshChildren }) => {
  //   const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("pink");

  const handleSubmit = (e) => {
    e.preventDefault();

   
    // let parentData = JSON.parse(localStorage.getItem("parent_data"));
    let parentData = localStorageManager.retrieveEncodedObject("parent_data")
    if (!parentData.childrenIds) {
      parentData = { ...parentData, childrenIds: [0] }
      // localStorage.setItem("parent_data", JSON.stringify(parentData))
      localStorageManager.storeEncodedObject("parent_data", parentData)
    } else {
      parentData = { ...parentData, childrenIds: [...parentData.childrenIds, parentData.childrenIds.length] }
      // localStorage.setItem("parent_data", JSON.stringify(parentData))
      localStorageManager.storeEncodedObject("parent_data", parentData)
    }
    const newChildId = parentData.childrenIds.at(-1)
    const initial = { id: newChildId, name: childName, theme: selectedTheme, personalTasks: [], assignedTasks: [] };
    // localStorage.setItem(`child_${newChildId}`, JSON.stringify(initial));
    localStorageManager.storeEncodedObject(`child_${newChildId}`, initial)
    // console.log(localStorage.getItem(`child_${newChildId}`))
    console.log(localStorageManager.retrieveEncodedObject(`child_${newChildId}`))
   
    refreshChildren()
    cancelAdd()
  };

  return (

    <div className="glass p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-md w-full mx-8 relative z-10">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Add a New Child
      </h1>

      <div className="[&_*:not(label):not(div):not(button)]:text-black">
        <div className="mb-6">
          <label htmlFor="childName" className="block text-blue-900 text-lg mb-2">
            Child's Name
          </label>
          <input
            type="text"
            id="childName"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/70 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter child's name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-blue-900 text-lg mb-2">
            Theme Color
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="pink"
                checked={selectedTheme === "pink"}
                onChange={() => setSelectedTheme("pink")}
                className="mr-2"
              />
              <span className="w-6 h-6 rounded-full bg-pink-500 inline-block mr-2"></span>
              Pink
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="orange"
                checked={selectedTheme === "orange"}
                onChange={() => setSelectedTheme("orange")}
                className="mr-2"
              />
              <span className="w-6 h-6 rounded-full bg-orange-500 inline-block mr-2"></span>
              Orange
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={cancelAdd}
            className="flex-1 py-3 px-6 bg-red-500 hover:bg-gray-400 rounded-lg  font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Add Child
          </button>
        </div>
      </div>
    </div>
  );
};