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
import { useParams } from "react-router-dom";

// Now we expect childId to be passed as a prop so we can use the same key as in ManageChildList
export const ToDoChild = () => {
  const { childId } = useParams();
  const childStorageKey = `child_${childId}`;

  const [childData, setChildData] = useState({ personalTasks: [], assignedTasks: [] });
  const [childType, setChildType] = useState("pink"); // default theme
  const [addingTask, setAddingTask] = useState(false);
  const [isEditingTask, setEditingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedChild = JSON.parse(localStorage.getItem(childStorageKey));
    if (storedChild) {
      setChildData(storedChild);
      setChildType(storedChild.theme || "pink"); // fallback to pink
    } else {
      console.warn(`Child with ID ${childId} not found in localStorage.`);
    }
  }, [childId]);

  const backgroundClass = "bg-white";

  const createTask = (task) => {
    setAddingTask(false);
    const updatedPersonal = [...childData.personalTasks, task];
    const updatedChild = { ...childData, personalTasks: updatedPersonal };
    setChildData(updatedChild);
    localStorage.setItem(childStorageKey, JSON.stringify(updatedChild));
  };

  const deleteTask = (taskId) => {
    const updatedPersonal = childData.personalTasks.filter((task) => task.taskId !== taskId);
    const updatedChild = { ...childData, personalTasks: updatedPersonal };
    setChildData(updatedChild);
    localStorage.setItem(childStorageKey, JSON.stringify(updatedChild));
  };

  const startEditingTask = (taskId) => {
    const editingTask = childData.personalTasks.find((task) => task.taskId === taskId);
    setTaskToEdit(editingTask);
    setEditingTask(true);
  };

  const editTask = (newTask) => {
    setEditingTask(false);
    const updatedPersonal = childData.personalTasks.map((task) => {
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
    const updatedChild = { ...childData, personalTasks: updatedPersonal };
    setChildData(updatedChild);
    localStorage.setItem(childStorageKey, JSON.stringify(updatedChild));
    setTaskToEdit(null);
  };

  const toggleCompletedStatus = (taskId) => {
    const updatedPersonal = childData.personalTasks.map((task) =>
      task.taskId === taskId ? { ...task, taskStatus: !task.taskStatus } : task
    );
    const updatedChild = { ...childData, personalTasks: updatedPersonal };
    setChildData(updatedChild);
    localStorage.setItem(childStorageKey, JSON.stringify(updatedChild));
  };

  const RenderView = () => {
    if (addingTask) {
      return (
        <div className="flex flex-1 gap-4">
          <div className="flex-[2] p-4">
            <CreateTaskCard
              onSave={createTask}
              onCancel={() => setAddingTask(false)}
              theme={childType}
            />
          </div>
          <div className="flex-[1] p-4 flex items-center justify-center">
            <Character childType={childType} name={childData.name} />
          </div>
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
    } else {
      return (
        <div className="flex flex-1 gap-4">
          {/* Assigned Tasks List */}
          <div className="flex-[1.5] p-4">
            <AssignedTaskList childId={childId} childType={childType} />
          </div>

          {/* Personal Tasks List */}
          <div className="flex-[1.5] p-4">
            <PersonalTaskList
              tasks={childData.personalTasks}
              addTask={() => setAddingTask(true)}
              deleteTask={deleteTask}
              onToggleStatus={toggleCompletedStatus}
              onEdit={startEditingTask}
              theme={childType}
            />
          </div>

          {/* Character Section */}
          <div className="flex-[1] p-4 flex items-center justify-center">
            <Character childType={childType} name={childData.name} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`h-screen flex flex-col ${backgroundClass}`}>
      <NavBar parent={false} childType={childType} childId={childId} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <RenderView />
      </div>
    </div>
  );
};