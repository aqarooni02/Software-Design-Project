import { TaskCard } from "./TaskCard";
import { CreateTaskCard } from "./CreateTaskCard";
import { useEffect, useState } from "react";
import { localStorageManager } from "../utils/localStorageManager";

export const ManageChildList = ({ childId }) => {
  const localStorageKey = `child_${childId}`;
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [assigningTask, setAssigningTask] = useState(false);
  const [childName, setChildName] = useState("Loading...");

  // Load child's data and tasks
  useEffect(() => {
    // const storedChild = JSON.parse(localStorage.getItem(localStorageKey));
    const storedChild = localStorageManager.retrieveEncodedObject(localStorageKey);
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

    // const storedChild = JSON.parse(localStorage.getItem(localStorageKey)) || {
    //   id: childId,
    //   name: childName,
    //   theme: "pink",
    //   personalTasks: [],
    //   assignedTasks: [],
    // };
    const storedChild = localStorageManager.retrieveEncodedObject(localStorageKey) || {
      id: childId,
      name: childName,
      theme: "pink",
      personalTasks: [],
      assignedTasks: [],
    };

    storedChild.assignedTasks = updatedTasks;
    // localStorage.setItem(localStorageKey, JSON.stringify(storedChild));
    localStorageManager.storeEncodedObject(localStorageKey, storedChild);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = assignedTasks.filter(task => task.taskId !== taskId);
    setAssignedTasks(updatedTasks);

    // const storedChild = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    const storedChild = localStorageManager.retrieveEncodedObject(localStorageKey) || {};
    storedChild.assignedTasks = updatedTasks;
    // localStorage.setItem(localStorageKey, JSON.stringify(storedChild));
    localStorageManager.storeEncodedObject(localStorageKey, storedChild);

  };
  const boxClasses =
  "min-h-3/4 max-h-3/4 bg-gradient-to-br from-white to-gray-100 rounded-3xl border border-gray-300 p-6 overflow-y-auto shadow-lg transition-shadow duration-300 ease-in-out [&::-webkit-scrollbar]:w-0 min-w-[600px]";

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
        <div className={boxClasses}>
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