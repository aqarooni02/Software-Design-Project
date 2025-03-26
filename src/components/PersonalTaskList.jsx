import { TaskCard } from "./TaskCard"
import { Task } from "../classes/Task"


export const PersonalTaskList = () => {
  
  const task = new Task('Task 1', 'Description 1', '2022-12-31', 'High', false)
  console.log(task)

  return (
    <>
      <div className="h-3/4 bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 ">
        <h2 className="text-2xl text-blue-700 font-bold mb-2">Personal</h2>
        <div className="flex flex-col gap-2">
        <TaskCard task={task} />
        <TaskCard task={task} />
        <TaskCard task={task} />

        </div>
      </div>
      <div className="p-4">
        <button className="w-full bg-pink-500 text-white py-2 rounded-lg text-lg font-semibold">
          Add Task
        </button>
      </div>
    </>
  )
}