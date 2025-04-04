import React, { useState } from "react";
import { Task } from "../classes/Task";

export const CreateTaskCard = ({ onSave, onCancel, theme }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const handleSave = () => {
    if (!taskTitle || !taskDate || !taskDescription) {
      alert("Please fill in all fields!");
      return;
    }
    onSave(
      new Task(
        taskTitle,
        taskDescription,
        taskDate,
        taskPriority,
        false // Default to not completed
      )
    );
    // Clear inputs after saving
    setTaskTitle("");
    setTaskDate("");
    setTaskDescription("");
    setTaskPriority("Medium");
  };

  // Theme-dependent classes.
  const cardBg =
    theme === "orange"
      ? "bg-orange-400/40"
      : theme === "pink"
      ? "bg-pink-400/40"
      : "bg-blue-400/40";
  const cardBorder =
    theme === "orange"
      ? "border-orange-400"
      : theme === "pink"
      ? "border-pink-400"
      : "border-blue-400";
  const cardText =
    theme === "orange"
      ? "text-orange-700"
      : theme === "pink"
      ? "text-pink-700"
      : "text-blue-700";

  return (
    <>
      <div className={`${cardBg} rounded-3xl border-2 ${cardBorder} p-4 ${cardText}`}>
        <h2 className="text-2xl font-bold mb-2">Create New Task</h2>
        <div className="grid grid-cols-2 gap-4 [&_*:not(label):not(div)]:bg-white [&_*:not(label):not(div)]:text-black">
          <div className="col-1">
            <label>Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-2">
            <label>Date</label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-1">
            <label>Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 border rounded h-20"
            />
          </div>
          <div className="col-2">
            <label>Priority</label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded w-full"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded w-full"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
