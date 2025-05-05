import { useEffect, useState } from "react";
import { Character } from "../components/Character";
import { NavBar } from "../components/NavBar";
import { PersonalTaskList } from "../components/PersonalTaskList";
import { CreateTaskCard } from "../components/CreateTaskCard";
import { EditTaskCard } from "../components/EditTaskCard";
import { Task } from "../classes/Task";
import { ParentChildSelector } from "../components/ParentChildSelector";
import { ManageChildList } from "../components/ManageChildList";
import { localStorageManager } from "../utils/localStorageManager";
import { useNavigate } from "react-router-dom";

/**
 * ToDoParent component representing the parent's task management view.
 * @component
 * @returns {JSX.Element} The rendered ToDoParent component
 */
export const ToDoParent = () => {
    const navigate = useNavigate();
    const [addingTask, setAddingTask] = useState(false);
    const [isEditingTask, setEditingTask] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [parentTasks, setParentTasks] = useState([]);
    const [childSelected, setChildSelected] = useState(null);

    useEffect(() => {
        const parent_data = localStorageManager.retrieveEncodedObject("parent_data");
        if (parent_data?.personalTasks == null) {
            setParentTasks([]);
        } else {
            setParentTasks(parent_data.personalTasks);
        }
    }, []);

    const updateLocalStorageTasks = (newTasks) => {
        const parent_data = localStorageManager.retrieveEncodedObject("parent_data") || {};
        parent_data.personalTasks = newTasks;
        localStorageManager.storeEncodedObject("parent_data", parent_data);
    };

    const createTask = (task) => {
        const updatedTasks = [...parentTasks, task];
        setAddingTask(false);
        setParentTasks(updatedTasks);
        updateLocalStorageTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = parentTasks.filter((task) => task.taskId !== taskId);
        setParentTasks(updatedTasks);
        updateLocalStorageTasks(updatedTasks);
    };

    const startEditingTask = (taskId) => {
        const editingTask = parentTasks.find((task) => task.taskId === taskId);
        setTaskToEdit(editingTask);
        setEditingTask(true);
    };

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
        updateLocalStorageTasks(editTask);
        setTaskToEdit(null);
    };

    const toggleCompletedStatus = (taskId) => {
        const togglingTask = parentTasks.find((task) => task.taskId === taskId);
        const toggleStatus = parentTasks.map((task) => {
            if (task.taskId === togglingTask.taskId) {
                return { ...task, taskStatus: !task.taskStatus }
            }
            return task;
        });
        setParentTasks(toggleStatus);
        updateLocalStorageTasks(toggleStatus);
        console.log(togglingTask.taskStatus)
    }

    const RenderView = () => {
        if (addingTask) {
            return (
                <div className="flex-[3] p-4">
                    <CreateTaskCard
                        onSave={createTask}
                        onCancel={() => setAddingTask(false)}
                        theme="blue"
                    />
                </div>
            );
        } else if (isEditingTask) {
            return (
                <div className="flex-1 md:flex-[3] p-4">
                    <EditTaskCard
                        onEdit={editTask}
                        onCancel={() => setEditingTask(false)}
                        currentTask={taskToEdit}
                        theme={"blue"}
                    />
                </div>
            );
        }
        else if (childSelected !== null) {
            return (
                <>
                    <div className="flex-[1] p-4 text-blue-700">
                        <ParentChildSelector childSelected={true} setSelectedChild={setChildSelected} />
                    </div>
                    <div className="flex-[2] p-4 text-blue-700">
                        <ManageChildList
                            childId={childSelected}
                        />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="flex-[1] p-4 text-blue-700">
                        <ParentChildSelector setSelectedChild={setChildSelected} />
                    </div>
                    <div className="flex-[2] p-4 text-blue-700">
                        <PersonalTaskList
                            tasks={parentTasks}
                            addTask={() => setAddingTask(true)}
                            deleteTask={deleteTask}
                            onToggleStatus={toggleCompletedStatus}
                            onEdit={startEditingTask}
                            theme="blue"
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            <NavBar  />
            <div className="flex flex-1 flex-wrap gap-4 p-4">
                <RenderView />
                <div className="flex-1 p-4">
                    <Character name="Parent" size="small" />
                </div>
            </div>
        </div>
    );
};
