import { TaskCard } from "./TaskCard";
import { CreateTaskCard } from "./CreateTaskCard";
import { useEffect, useState } from "react";

export const ManageChildList = ({ childId }) => {
  const localStorageKey = `child_${childId}`;
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [assigningTask, setAssigningTask] = useState(false);
  const [childName, setChildName] = useState("Loading...");

  // Load child's data and tasks
  useEffect(() => {
    const storedChild = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedChild) {
      setAssignedTasks(storedChild.assignedTasks || []);
      setChildName(storedChild.name || "Unnamed Child");
    } else {
      setAssignedTasks([]);
      setChildName("Unknown Child");
    }
  }, [childId]);

  const handleAssignTask = (newTask) => {
    const updatedTasks = [...assignedTasks, newTask];
    setAssignedTasks(updatedTasks);
    setAssigningTask(false);

    const storedChild = JSON.parse(localStorage.getItem(localStorageKey)) || {
      id: childId,
      name: childName,
      theme: "pink",
      personalTasks: [],
      assignedTasks: [],
    };

    storedChild.assignedTasks = updatedTasks;
    localStorage.setItem(localStorageKey, JSON.stringify(storedChild));
  };

  const handleDelete = (taskId) => {
    const updatedTasks = assignedTasks.filter(task => task.taskId !== taskId);
    setAssignedTasks(updatedTasks);

    const storedChild = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    storedChild.assignedTasks = updatedTasks;
    localStorage.setItem(localStorageKey, JSON.stringify(storedChild));
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">{childName}'s Assigned Tasks</h2>
      {assigningTask ? (
        <CreateTaskCard
          onSave={handleAssignTask}
          onCancel={() => setAssigningTask(false)}
          theme="blue"
        />
      ) : (
        <div className="min-h-3/4 max-h-3/4 bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 overflow-y-auto">
          {assignedTasks.length !== 0 ? (
            <div className="flex flex-col gap-2 pb-2">
              {assignedTasks.map((task) => (
                <TaskCard key={task.taskId} task={task} onDelete={handleDelete} theme="blue" noToggle/>
              ))}
            </div>
          ) : (
            <h2 className="text-xl font-bold mb-2">No Tasks Yet!</h2>
          )}
        </div>
      )}
      {!assigningTask && (
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold mt-4"
          onClick={() => setAssigningTask(true)}
        >
          Assign Task
        </button>
      )}
    </>
  );
};