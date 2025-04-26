import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";

export const PersonalTaskList = ({ tasks, addTask, deleteTask, onToggleStatus, onEdit, theme }) => {
  const headingClasses = "text-2xl font-bold mb-4 text-black text-center";

  // Updated boxClasses without hover effect
  const boxClasses =
    "min-h-3/4 max-h-3/4 bg-gradient-to-br from-white to-gray-100 rounded-3xl border border-gray-300 p-6 overflow-y-auto shadow-lg transition-shadow duration-300 ease-in-out [&::-webkit-scrollbar]:w-0 min-w-[600px]";

  return (
    <>
      <h2 className={headingClasses}>Personal Tasks</h2>
      <div className={boxClasses}>
        <div className="flex flex-col gap-6 pb-4">
          {tasks.length !== 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                onDelete={deleteTask}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                theme={theme}
              />
            ))
          ) : (
            <h2 className="text-xl font-bold mb-2 text-gray-500 text-center">No Tasks Yet!</h2>
          )}
        </div>
        <div className="p-4">
          <button
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={addTask}
          >
            + Add New Task
          </button>
        </div>
      </div>
    </>
  );
};