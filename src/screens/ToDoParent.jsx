import { useEffect, useState } from "react";
import { Character } from "../components/Character";
import { NavBar } from "../components/NavBar";
import { PersonalTaskList } from "../components/PersonalTaskList";
import { CreateTaskCard } from "../components/CreateTaskCard";
import { EditTaskCard } from "../components/EditTaskCard";
import { Task } from "../classes/Task";
import { ParentChildSelector } from "../components/ParentChildSelector";
import { ManageChildList } from "../components/ManageChildList";

export const ToDoParent = () => {
  const [addingTask, setAddingTask] = useState(false);
  const [isEditingTask, setEditingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [parentTasks, setParentTasks] = useState([]);
  const [childSelected, setChildSelected] = useState(null)

  const getTasks = JSON.parse(localStorage.getItem("parentTasks"));
  useEffect(() => {
    if (getTasks == null) {
      setParentTasks([]);
    } else {
      setParentTasks(getTasks);
    }
  }, []);

  const createTask = (task) => {
    setAddingTask(false);
    setParentTasks([...parentTasks, task]);
    localStorage.setItem("parentTasks", JSON.stringify([...parentTasks, task]));
  };

  const deleteTask = (taskId) => {
    const deleteTask = parentTasks.filter((task) => task.taskId !== taskId);
    setParentTasks(deleteTask);
    localStorage.setItem("parentTasks", JSON.stringify(deleteTask));
  };

  const startEditingTask = (taskId) => {
    const editingTask = parentTasks.find((task) => task.taskId === taskId);
    setTaskToEdit(editingTask);
    setEditingTask(true);
  };

  // const manageChild = (childId) => {

  // }

  const editTask = (newTask) => {
    setEditingTask(false);
    const editTask = parentTasks.map((task) => {
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
    setParentTasks(editTask);
    localStorage.setItem("parentTasks", JSON.stringify(editTask));
  };

  const RenderView = () => {
    if (addingTask) {
      return (
        <div className="flex-1 md:flex-[2] p-4">
          <CreateTaskCard
            onSave={createTask}
            onCancel={() => setAddingTask(false)}
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
    else if (childSelected !== null) {
      return (
        <>
          <div className="flex-1 p-4 text-blue-700">
            <ParentChildSelector setSelectedChild={setChildSelected} />
          </div>
          <div className="flex-1 p-4 text-blue-700">
            <ManageChildList
            childId={childSelected}
            />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="flex-1 p-4 text-blue-700">
            <ParentChildSelector setSelectedChild={setChildSelected} />
          </div>
          <div className="flex-1 p-4 text-blue-700">
            <PersonalTaskList
              tasks={parentTasks}
              addTask={() => setAddingTask(true)}
              deleteTask={deleteTask}
              editTask={startEditingTask}
            />
          </div>
        </>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar parent={true} />
      <div className="flex flex-1 flex-wrap gap-4 p-4">
        <RenderView />
        <div className="flex-1 p-4">
          <Character />
        </div>
      </div>
    </div>
  );
};
