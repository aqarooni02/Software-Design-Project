import React from "react";

export const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-400 rounded-lg shadow-md border-b-blue-700 border-b-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.taskStatus}
          onChange={() => onToggleStatus(task.taskId)}
          className="mr-2 vertical-center"
        />
        <div>
          <h3 className="font-bold text-lg">{task.taskTitle}</h3>
          <p className="text-sm text-gray-700">{task.taskDescription}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">Due: {task.taskDate}</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={() => onEdit(task.taskId)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded"
            onClick={() => onDelete(task.taskId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};