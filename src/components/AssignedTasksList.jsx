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
      ? "text-2xl font-bold mb-2 text-orange-500 text-center"
      : "text-2xl font-bold mb-2 text-pink-500 text-center";

  const boxClasses =
    childType === "orange"
      ? "h-3/4 bg-orange-300/40 rounded-3xl border-2 border-orange-400 p-4 overflow-y-auto"
      : "h-3/4 bg-pink-400/40 rounded-3xl border-2 border-pink-400 p-4 overflow-y-auto";

  return (
    <>
      <h2 className={headingClasses}>Assigned by Parent</h2>
      <div className={boxClasses}>
        {assignedTasks.length !== 0 ? (
          <div className="flex flex-col gap-2 pb-2">
            {assignedTasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                onToggleStatus={toggleCompletedStatus} // Pass the toggle function here
                theme={childType}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-xl font-bold mb-2">No tasks assigned yet!</h2>
        )}
      </div>
    </>
  );
};