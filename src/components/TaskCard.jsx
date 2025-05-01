import React, { useState } from "react";
import { FlagIcon as OutlineFlagIcon } from "@heroicons/react/24/outline";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid"; // Import icons for edit and delete

export const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, noToggle = false, giveStar = false }) => {

  const [starred, setStarred] = useState(task.starred)
  // Priority-based styles
  const priorityColors = {
    High: "border-red-500",
    Medium: "border-amber-500",
    Low: "border-green-500",
  };

  const priorityColor = priorityColors[task.taskPriority] || "border-gray-300";


  // Completed task styling
  const textClass = task.taskStatus ? "line-through opacity-75" : "";

  return (
    <div
      className={`flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 ${priorityColor} hover:bg-gray-50 transition-all duration-150 min-w-[500px]`} // Reduced min-w
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!noToggle && (
            <input
              type="checkbox"
              checked={task.taskStatus}
              onChange={() => onToggleStatus && onToggleStatus(task.taskId)}
              className="w-6 h-6 accent-green-500 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform duration-150"
            />
          )}
          <h3 className={`font-semibold text-lg ${textClass} text-black`}>{task.taskTitle}</h3> {/* Set task title to black */}
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              className="flex items-center justify-center text-blue-500 hover:text-blue-700 transition-all duration-150"
              onClick={() => onEdit(task.taskId)}
            >
              <PencilIcon className="w-5 h-5" /> {/* Blue pencil icon */}
            </button>
          )}
          {onDelete && (
            <button
              className="flex items-center justify-center text-red-500 hover:text-red-700 transition-all duration-150"
              onClick={() => onDelete(task.taskId)}
            >
              <TrashIcon className="w-5 h-5" /> {/* Red bin icon */}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600"> {/* Set metadata to gray */}
        <div className="flex items-center gap-2">
          <OutlineFlagIcon className="w-5 h-5 text-gray-500" />
          <span>{task.taskPriority}</span>
        </div>
        <span>{task.taskDate}</span>
      </div>
      {task.taskDescription && (
        <div className="p-4 bg-[#F0F9FF] rounded-md text-gray-700 text-sm">
          {task.taskDescription}
        </div>
      )}
      {giveStar && task.taskStatus && (
        <div className="flex justify-between">
          {!starred ? (
            <>
              <h2>
                Task Complete! Assign Star:
              </h2>
              <button
                className="flex items-center justify-center text-accent hover:text-accent transition-all duration-150"
                onClick={() => {
                  giveStar(task.taskId)
                  setStarred(true)
                }}
              >
                <StarIcon className="w-5 h-5" /> {/* Red bin icon */}
              </button>
            </>
          ) : (
            <>
              <h2>
                Task Complete!
              </h2>
              <h2>
                Star Assigned!
              </h2>
            </>

          )}

        </div>
      )}
      {!giveStar && starred && (
        <div className="flex justify-between">
          <h2 className="text-blue-700">
            Star Recieved!
          </h2>
          <StarIcon className="w-5 h-5 text-accent" /> {/* Red bin icon */}
        </div>

      )}
    </div>
  );
};