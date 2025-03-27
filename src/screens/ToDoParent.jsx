import { useEffect, useState } from "react";
import { Character } from "../components/Character";
import { NavBar } from "../components/NavBar";
import { PersonalTaskList } from "../components/PersonalTaskList";
import { CreateTaskCard } from "../components/CreateTaskCard";
import { EditTaskCard } from "../components/EditTaskCard";
import { Task } from "../classes/Task";
export const ToDoParent = () => {
  const [addingTask, setAddingTask] = useState(false);
  const [isEditingTask, setEditingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [parentTasks, setParentTasks] = useState([]);

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
    // const newTask = new Task({...task})
    // console.log('add task', task)
    setParentTasks([...parentTasks, task]);
    localStorage.setItem("parentTasks", JSON.stringify([...parentTasks, task]));
  };

  const deleteTask = (taskId) => {
    // const newTask = new Task({...task})
    // console.log('add task', task)
    const deleteTask = parentTasks.filter((task) => task.taskId !== taskId);
    setParentTasks(deleteTask);
    localStorage.setItem("parentTasks", JSON.stringify(deleteTask));
  };

  const startEditingTask = (taskId) => {
    const editingTask = parentTasks.find((task) => task.taskId === taskId);
    console.log("editing task with id", editingTask.taskId);
    setTaskToEdit(editingTask);
    setEditingTask(true);
  };
  const editTask = (newTask) => {
    // const newTask = new Task({...task})
    // console.log('add task', task)
    setEditingTask(false);
    const editTask = parentTasks.map((task) => {
        console.log(task.taskId, taskToEdit.taskId)
      if (task.taskId === taskToEdit.taskId) {
        console.log("found");
        return new Task(newTask.newTaskTitle, newTask.newTaskDescription, newTask.newTaskDate, newTask.newTaskPriority, task.taskStatus);
      }
      return task;
    });
    console.log(editTask)
    setParentTasks(editTask);
    localStorage.setItem("parentTasks", JSON.stringify(editTask));
  };

  return (
    <>
      <div className="h-screen flex flex-col ">
        <NavBar parent={true} />
        <div className="flex flex-1 gap-4 p-4">
          {addingTask ? (
            <>
              <div className="flex-2 p-4 ">
                <CreateTaskCard
                  onSave={createTask}
                  onCancel={() => setAddingTask(false)}
                />
              </div>
              <div className="flex-1 p-4">
                <Character />
              </div>
            </>
          ) : isEditingTask ? (
            <>
              <div className="flex-2 p-4 ">
                <EditTaskCard
                  onEdit={editTask}
                  onCancel={() => setEditingTask(false)}
                  currentTask={taskToEdit}
                />
              </div>
              <div className="flex-1 p-4">
                <Character />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 p-4"></div>
              <div className="flex-1 p-4 text-blue-700">
                <PersonalTaskList
                  tasks={parentTasks}
                  addTask={() => setAddingTask(true)}
                  deleteTask={deleteTask}
                  editTask={startEditingTask}
                />
              </div>
              <div className="flex-1 p-4">
                <Character />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
