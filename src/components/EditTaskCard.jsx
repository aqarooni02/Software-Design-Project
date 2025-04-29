import React, { useState } from "react";
import { Task } from "../classes/Task";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export const EditTaskCard = ({ onEdit, onCancel, currentTask, theme }) => {
  const [taskTitle, setTaskTitle] = useState(currentTask.taskTitle);
  const [taskDate, setTaskDate] = useState(currentTask.taskDate);
  const [taskDescription, setTaskDescription] = useState(
    currentTask.taskDescription
  );
  const [taskPriority, setTaskPriority] = useState(currentTask.taskPriority);

  const handleSave = () => {
    if (!taskTitle || !taskDate || !taskDescription) {
      alert("Please fill in all fields!");
      return;
    }
    // console.log(typeof currentTask)
    // console.log(currentTask)
    // console.log(currentTask instanceof Task)
    // currentTask.setTitle(taskTitle);
    // currentTask.setDate(taskDate);
    // currentTask.setDescription(taskDescription);
    // currentTask.setPriority(taskPriority);
    // console.log(currentTask)
    // console.log(typeof currentTask)
    // console.log(currentTask instanceof Task)
    console.log(taskTitle, taskDate, taskDescription, taskPriority);
    onEdit({
      newTaskTitle: taskTitle,
      newTaskDate: taskDate,
      newTaskDescription: taskDescription,
      newTaskPriority: taskPriority,
    });

    // Clear inputs after saving
    setTaskTitle("");
    setTaskDate("");
    setTaskDescription("");
    setTaskPriority("Medium");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="p-12 rounded-3xl shadow-2xl bg-white border-4 border-gray-300 max-w-3xl w-full">
        {/* White outer box */}
        <h2
          className={`text-4xl font-bold mb-8 text-${
            theme === "blue" ? "blue-700" : `${theme}-700`
          } text-center`}
        >
          Edit Task
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Task Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Task Title
            </label>
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
            <label className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 border rounded-lg text-black"
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Priority
            </label>
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
