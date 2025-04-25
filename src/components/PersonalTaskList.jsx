import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";

export const PersonalTaskList = ({ tasks, addTask, deleteTask, onToggleStatus, onEdit, theme }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  // Theme-based styles
  const boxClasses = "min-h-3/4 max-h-3/4 bg-white rounded-3xl border border-[#F1F5F9] p-4 overflow-y-auto shadow-md [&::-webkit-scrollbar]:w-0 min-w-[600px]"; // Reduced min-w
  const headingClasses = theme === "blue" ? "text-2xl font-bold mb-6 text-black text-center" : "text-2xl font-bold mb-6 text-center";
  const addButtonClasses = theme === "orange"
    ? "w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-150"
    : theme === "pink"
    ? "w-full bg-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-all duration-150"
    : "w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-150"; // Default to blue for parent

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Personal Tasks</h2> {/* Set heading to black */}
      <div className={boxClasses}>
        <div className="flex flex-col gap-6 pb-4">
          {taskList.length !== 0
            ? taskList.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                onDelete={deleteTask}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                theme={theme}
              />
            ))
            : <h2 className="text-xl font-bold mb-2 text-gray-500 text-center">No Tasks Yet!</h2> // Set empty state text to gray
          }
        </div>
      </div>
      <div className="p-4">
        <button
          className={addButtonClasses}
          onClick={() => {
            console.log("Button clicked in PersonalTaskList"); // Debug log
            addTask();
          }}
        >
          + Add New Task
        </button>
      </div>
    </>
  );
};