import React, { useState } from "react";
import { Task } from "../classes/Task";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"; // Import icons

export const CreateTaskCard = ({ onSave, onCancel, theme }) => {
  console.log("CreateTaskCard rendered with theme:", theme); // Debug log

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const handleSave = () => {
    if (!taskTitle || !taskDate) {
      alert("Please fill in all fields!");
      return;
    }
    if (new Date(taskDate) < new Date()) {
      alert("Please select a future date!");
      return;
    }
    if (!/[a-zA-Z]/.test(taskTitle)) {
      alert("Task title must contain at least one letter!");
      return;
    }
    console.log("Saving task:", { taskTitle, taskDate, taskDescription, taskPriority }); // Debug log
    onSave(
      new Task(
        taskTitle,
        taskDescription,
        taskDate,
        taskPriority,
        false // Default to not completed
      )
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100"> 
      <div className="p-12 rounded-3xl shadow-2xl bg-white border-4 border-gray-300 max-w-3xl w-full"> {/* White outer box */}
        <h2
          className={`text-4xl font-bold mb-8 text-${
            theme === "blue" ? "blue-700" : `${theme}-700`
          } text-center`}
        >
          Create New Task
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Task Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
              placeholder="Enter task title"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Priority</label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-8 justify-center">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <XCircleIcon className="w-6 h-6" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            <CheckCircleIcon className="w-6 h-6" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
