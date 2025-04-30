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
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [addingTask, setAddingTask] = useState(false);
    const [isEditingTask, setEditingTask] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [parentTasks, setParentTasks] = useState([]);
    const [childSelected, setChildSelected] = useState(null);

    // Check for existing authentication on component mount
    useEffect(() => {
        const auth = localStorageManager.retrieveEncodedObject("parent_auth");
        if (auth) {
            setIsAuthenticated(true);
        }
    }, []);

    // Simple password check: 2 + 2 = 4
    const checkPassword = () => {
        if (password === '4') {
            setIsAuthenticated(true);
            setError('');
            // Store authentication in localStorage
            localStorageManager.storeEncodedObject("parent_auth", { authenticated: true });
        } else {
            setError('Wrong answer! Try again.');
        }
    };

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

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-md relative">
                    <button 
                        onClick={() => navigate('/profile-selection')}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                    <h2 className="text-2xl text-black font-bold mb-6 text-center">Parent Access</h2>
                    <p className="mb-4 text-center text-black">What is 2 + 2?</p>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                        placeholder="Enter the answer"
                    />
                    <button
                        onClick={checkPassword}
                        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-white">
            <NavBar parent={true} />
            <div className="flex flex-1 flex-wrap gap-4 p-4">
                <RenderView />
                <div className="flex-1 p-4">
                    <Character name="Parent" size="small" />
                </div>
            </div>
        </div>
    );
};
