import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

export const AssignedTaskList = ({ childId, childType }) => {
  const localStorageKey = `child_${childId}`;
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    const storedChild = JSON.parse(localStorage.getItem(localStorageKey));
    const newTasks = storedChild && storedChild.assignedTasks ? storedChild.assignedTasks : [];
    setAssignedTasks(newTasks);
  }, [childId, localStorageKey]);

  // fixing the toggle completed status function
  const toggleCompletedStatus = (taskId) => {
    const updatedTasks = assignedTasks.map((task) =>
      task.taskId === taskId ? { ...task, taskStatus: !task.taskStatus } : task
    );
    setAssignedTasks(updatedTasks);

    const storedChild = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    storedChild.assignedTasks = updatedTasks;
    localStorage.setItem(localStorageKey, JSON.stringify(storedChild));
  };

  const headingClasses =
    childType === "orange"
      ? "text-2xl font-bold mb-4 text-orange-500 text-center"
      : "text-2xl font-bold mb-4 text-pink-500 text-center";

  // Enhanced boxClasses for more depth
  const boxClasses =
    "min-h-3/4 max-h-3/4 bg-gradient-to-br from-white to-gray-100 rounded-3xl border border-gray-300 p-6 overflow-y-auto shadow-lg transition-shadow duration-300 ease-in-out [&::-webkit-scrollbar]:w-0 min-w-[600px]";

  return (
    <>
      <h2 className={headingClasses.replace(/text-\w+-500/, "text-black")}>Assigned by Parent</h2> {/* Set heading to black */}
      <div className={boxClasses}>
        {assignedTasks.length !== 0 ? (
          <div className="flex flex-col gap-4 pb-4">
            {assignedTasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                onToggleStatus={toggleCompletedStatus}
                theme={childType}
              />
            ))}
          </div>
        ) : (
          // Set empty state text to gray
          <h2 className="text-xl font-bold mb-2 text-gray-500 text-center">No tasks assigned yet!</h2>
        )}
      </div>
    </>
  );
};