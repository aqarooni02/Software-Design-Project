// Here is where the child can create,edit, delete tasks

import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { PersonalTaskList } from "../components/PersonalTaskList";
import { CreateTaskCard } from "../components/CreateTaskCard";
import characterPink from '../assets/CharacterPink.png';
import characterOrange from '../assets/CharacterOrange.png';
import { AssignedTaskList } from "../components/AssignedTasksList";
import { Task } from "../classes/Task";
import { Character } from "../components/Character";
import { EditTaskCard } from "../components/EditTaskCard";

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
  const [isEditingTask, setEditingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
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

  const startEditingTask = (taskId) => {
    const editingTask = personalTasks.find((task) => task.taskId === taskId);
    setTaskToEdit(editingTask);
    setEditingTask(true);
};

  const editTask = (newTask) => {
    setEditingTask(false);
    const editTask = personalTasks.map((task) => {
      if (task.taskId === taskToEdit.taskId) {
        return new Task(
          newTask.newTaskTitle,
          newTask.newTaskDescription,
          newTask.newTaskDate,
          newTask.newTaskPriority,
          task.taskStatus,
          task.taskId
        );
      }
      return task;
    });
    setPersonalTasks(editTask);
    localStorage.setItem(localStorageKey, JSON.stringify(editTask));
    setTaskToEdit(null);
  };

  const toggleCompletedStatus = (taskId) => {
    const togglingTask = personalTasks.find((task) => task.taskId === taskId);
    const toggleStatus = personalTasks.map((task) => {
      if (task.taskId === togglingTask.taskId) {
        return { ...task, taskStatus: !task.taskStatus }
      }
      return task;
    });
    setPersonalTasks(toggleStatus);
    localStorage.setItem(localStorageKey, JSON.stringify(toggleStatus));
    console.log(togglingTask.taskStatus)
  }

  const RenderView = () => {
    if (addingTask) {
      return (
        <div className="flex-2 p-4">
          <CreateTaskCard
            onSave={createTask}
            onCancel={() => setAddingTask(false)}
            theme={theme}  // thetheme is set based on childType ("pink" or "orange")
          />
        </div>
      );
    } else if (isEditingTask) {
      return (
        <div className="flex-1 md:flex-[2] p-4">
          <EditTaskCard
            onEdit={editTask}
            onCancel={() => setEditingTask(false)}
            currentTask={taskToEdit}
          />
        </div>
      );
    }
    else {
      return (
        <>
          <div className="flex-1 p-4">
            <AssignedTaskList childType={childType} />
          </div>
          <div className="flex-1 p-4">
            <PersonalTaskList
              tasks={personalTasks}
              addTask={() => setAddingTask(true)}
              deleteTask={deleteTask}
              onToggleStatus={toggleCompletedStatus} // Your toggle/edit functions here if needed
              onEdit={startEditingTask}
              theme={theme}  // "pink" or "orange"
            />
          </div>
        </>
      );
    }
  };

  {/* THERE ARE 3 SECTIONS
    left: assigned taskls by parent to child
    middle: the chil's personal tasks
    right: the image of the characte  '
    ofc the data and theme all depend on which child is selected (pink or orange)*/}

  return (
    <div className={`h-screen flex flex-col ${backgroundClass}`}>
      <NavBar parent={false} childType={childType} /> {/* Pass childType now */}
      <div className="flex flex-1 flex-wrap gap-4 p-4">
        <RenderView />
        <div className="flex-1 p-4">
          <Character
            childType={childType}
          />
        </div>
      </div>
    </div>
  );

};