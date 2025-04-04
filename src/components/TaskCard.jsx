import React from "react";

export const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, theme }) => {
  const bgClass = theme === "orange"
    ? "bg-orange-400"
    : theme === "pink" ? "bg-pink-400" : "bg-blue-400";
  const borderClass = theme === "orange"
    ? "border-b-orange-700"
    : theme === "pink" ? "border-b-pink-700" : "border-b-blue-700";
  const buttonClass = theme === "orange"
    ? "bg-orange-500"
    : theme === "pink" ? "bg-pink-500" : "bg-blue-500";

  return (
    <div className={`flex items-center justify-between p-4 ${bgClass} rounded-lg shadow-md ${borderClass} border-b-2 text-white`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.taskStatus}
          onChange={() => onToggleStatus(task.taskId)}
          className="mr-2 vertical-center"
        />
        <div>
          <h3 className="font-bold text-lg">{task.taskTitle}</h3>
          <h4 className="font-bold text-md">Priority: {task.taskPriority}</h4>
          <p className="text-sm break-words w-full">
            {task.taskDescription.split(" ").slice(0, 100).join(" ")}
            {task.taskDescription.split(" ").length > 100 && "..."}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">Due: {task.taskDate}</p>
        <div className="flex gap-2 mt-2">
          <button
            className={`${buttonClass} px-4 py-1 rounded`}
            onClick={() => onEdit(task.taskId)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 px-4 py-1 rounded"
            onClick={() => onDelete(task.taskId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};