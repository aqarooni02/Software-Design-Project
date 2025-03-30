import { TaskCard } from "./TaskCard"
import { Task } from "../classes/Task"
import { useEffect, useState } from "react"


export const PersonalTaskList = ({ tasks, addTask, deleteTask}) => {
  // console.log(task)
  const [taskList, setTaskList] = useState([])
  useEffect(()=> {
   
      setTaskList(tasks);
  
  },[tasks])
  

  return (
    <>
      <div className="h-3/4 bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0
      ">
        <h2 className="text-2xl  font-bold mb-2 ">Personal</h2>
        <div className="flex flex-col gap-2 pb-2 
      "> {
        taskList.length != 0 ? 
        taskList.map((task) => (

          <TaskCard key={task.taskId} task={task} onDelete={deleteTask} />
        )) :
        <h2 className="text-xl  font-bold mb-2">No Tasks Yet!</h2>
      }
          {/* <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} /> */}

        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-pink-500 text-white py-2 rounded-lg text-lg font-semibold"
          onClick={() => addTask()}>
          Add Task
        </button>
      </div>
    </>
  )
}