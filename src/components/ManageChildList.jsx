import { TaskCard } from "./TaskCard"
import { Task } from "../classes/Task"
import { useEffect, useState } from "react"


export const ManageChildList = ({ tasks, childId }) => {
  // console.log(task)
  const [taskList, setTaskList] = useState([])
  useEffect(() => {
    tasks ? setTaskList(tasks) : setTaskList([])

  }, [tasks])


  return (
    <>
      <h2 className="text-2xl font-bold mb-2 ">Child {childId}</h2>
      <div className="min-h-3/4 max-h-3/4 bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-0
      ">
        <div className="flex flex-col gap-2 pb-2 
      "> {
            taskList.length != 0 ?
              taskList.map((task) => (

                <TaskCard key={task.taskId} task={task} onDelete={deleteTask} onEdit={editTask} />
              )) :
              <h2 className="text-xl font-bold mb-2">No Tasks Yet!</h2>
          }

        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-pink-500 text-white py-2 rounded-lg text-lg font-semibold"
          onClick={() => assignTask()}>
          Assign Task
        </button>
      </div>
    </>
  )
}