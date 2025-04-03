import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";

export const PersonalTaskList = ({ tasks, addTask, deleteTask, onToggleStatus, onEdit, theme }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  let boxClasses, headingClasses, addButtonClasses;
  if (theme === "orange") {
    boxClasses = "min-h-3/4 max-h-3/4 bg-orange-400/40 rounded-3xl border-2 border-orange-400 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0";
    headingClasses = "text-2xl font-bold mb-2 text-orange-700";
    addButtonClasses = "w-full bg-orange-500 text-white py-2 rounded-lg text-lg font-semibold";
  } else if (theme === "pink") {
    boxClasses = "min-h-3/4 max-h-3/4 bg-pink-400/40 rounded-3xl border-2 border-pink-400 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0";
    headingClasses = "text-2xl font-bold mb-2 text-pink-700";
    addButtonClasses = "w-full bg-pink-500 text-white py-2 rounded-lg text-lg font-semibold";
  } else {
    boxClasses = "min-h-3/4 max-h-3/4 bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0";
    headingClasses = "text-2xl font-bold mb-2 text-blue-700";
    addButtonClasses = "w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold";
  }

  return (
    <>
      <h2 className={headingClasses}>Personal</h2>
      <div className={boxClasses}>
        <div className="flex flex-col gap-2 pb-2">
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
            : <h2 className="text-xl font-bold mb-2">No Tasks Yet!</h2>
          }
        </div>
      </div>
      <div className="p-4">
        <button
          className={addButtonClasses}
          onClick={() => addTask()}>
          Add Task
        </button>
      </div>
    </>
  );
};