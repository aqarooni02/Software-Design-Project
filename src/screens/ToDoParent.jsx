
import { useState } from "react"
import { Character } from "../components/Character"
import { NavBar } from "../components/NavBar"
import { PersonalTaskList } from "../components/PersonalTaskList"
import { CreateTaskCard } from "../components/CreateTaskCard"
export const ToDoParent = () => {
    const [addingTask, setAddingTask] = useState(false)
    const [parentTasks, setParentTasks] = useState([])
    const createTask = (task) => {
        setAddingTask(false)
        // const newTask = new Task({...task})
        // console.log('add task', task)
        setParentTasks([...parentTasks, task])
        localStorage.setItem("parentTasks", JSON.stringify([...parentTasks, task]));
    }

    const deleteTask = (taskId) => {
        // const newTask = new Task({...task})
        // console.log('add task', task)
        const deleteTask = parentTasks.filter((task) => task.taskId !== taskId);
        setParentTasks(deleteTask)
        localStorage.setItem("parentTasks", JSON.stringify(deleteTask));
    }

    return (
        <>
            <div className="h-screen flex flex-col ">
                <NavBar parent={true} />
                <div className="flex flex-1 gap-4 p-4" >
                    {!addingTask ? <>

                        <div className="flex-1 p-4"></div>
                        <div className="flex-1 p-4 text-blue-700">
                            <PersonalTaskList tasks={parentTasks} addTask={() => setAddingTask(true) } deleteTask={deleteTask} />
                        </div>
                        <div className="flex-1 p-4">
                            <Character />
                        </div>

                    </>
                        :
                        <>
                            <div className="flex-2 p-4 ">
                                <CreateTaskCard onSave={createTask} onCancel={() => setAddingTask(false)} />
                            </div>
                            <div className="flex-1 p-4">
                                <Character />
                            </div>
                        </>
                    }
                </div>

            </div >
        </>
    )
}