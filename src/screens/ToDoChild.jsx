// Here is where the child can create,edit, delete tasks

import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { PersonalTaskList } from "../components/PersonalTaskList";
import { CreateTaskCard } from "../components/CreateTaskCard";
import characterPink from '../assets/CharacterPink.png';
import characterOrange from '../assets/CharacterOrange.png';

export const ToDoChild = ({ childType = "pink" }) => {
  // Use childType ("pink" or "orange") to determine theme and storage key
  const theme = childType; // will be passed down to PersonalTaskList and TaskCard
  const localStorageKey = childType === "orange" ? "childOrangeTasks" : "childPersonalTasks";
  const backgroundClass =
    childType === "orange"
      ? "bg-gradient-to-b from-orange-200 via-orange-300 to-orange-100"
      : "bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100";
  const characterImage = childType === "orange" ? characterOrange : characterPink;

  const [addingTask, setAddingTask] = useState(false);
  const [personalTasks, setPersonalTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]); // For tasks assigned by parent

  const getPersonalTasks = JSON.parse(localStorage.getItem(localStorageKey));
  useEffect(() => {
    setPersonalTasks(getPersonalTasks ? getPersonalTasks : []);
  }, []);

  const createTask = (task) => {
    setAddingTask(false);
    const updated = [...personalTasks, task];
    setPersonalTasks(updated);
    localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = personalTasks.filter((task) => task.taskId !== taskId);
    setPersonalTasks(updatedTasks);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
  };
  
  {/* THERE ARE 3 SECTIONS
    left: assigned taskls by parent to child
    middle: the chil's personal tasks
    right: the image of the characte  '
    ofc the data and theme all depend on which child is selected (pink or orange)*/}
  return (
    <div className={`h-screen flex flex-col ${backgroundClass}`}>
      <NavBar parent={false} childType={childType} /> {/* Pass childType now */}
      <div className="flex flex-1 gap-4 p-4">
        {!addingTask ? (
          <>
            {/* Left section - Assigned Tasks */}
            <div className="flex-1 p-4">
              <div
                className={
                  childType === "orange"
                    ? "h-3/4 bg-orange-400/40 rounded-3xl border-2 border-orange-400 p-4 overflow-y-auto"
                    : "h-3/4 bg-pink-400/40 rounded-3xl border-2 border-pink-400 p-4 overflow-y-auto"
                }
              >
                <h2
                  className={
                    childType === "orange"
                      ? "text-2xl font-bold mb-2 text-orange-700"
                      : "text-2xl font-bold mb-2 text-pink-700"
                  }
                >
                  Assigned by Parent
                </h2>
                <div className="flex flex-col gap-2 pb-2">
                  <p
                    className={
                      childType === "orange"
                        ? "text-orange-700 text-lg"
                        : "text-pink-700 text-lg"
                    }
                  >
                    No tasks assigned yet!
                  </p>
                </div>
              </div>
            </div>

            {/* Middle section - Personal Tasks */}
            <div className="flex-1 p-4">
              <PersonalTaskList 
                tasks={personalTasks} 
                addTask={() => setAddingTask(true)} 
                deleteTask={deleteTask}
                onToggleStatus={undefined} // Your toggle/edit functions here if needed
                onEdit={undefined}
                theme={theme}  // "pink" or "orange"
              />
            </div>

            {/* Right section - Mascot image */}
            <div className="flex-1 p-4">
              <img
                src={characterImage}
                alt="Homey Character"
                className="w-full h-full object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </>
        ) : (
          <>
            {/* Create Task View */}
            <div className="flex-2 p-4">
              <CreateTaskCard 
                onSave={createTask} 
                onCancel={() => setAddingTask(false)}
                theme={theme}  // thetheme is set based on childType ("pink" or "orange")
              />
            </div>
            <div className="flex-1 p-4">
              <img
                src={characterImage}
                alt="Homey Character"
                className="w-full h-full object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};