
import './App.css'
import { PersonalTaskList } from './components/PersonalTaskList'
import {Task} from './classes/Task'
import { TaskCard } from './components/TaskCard'

function App() {
  const task = new Task('Task 1', 'Description 1', '2022-12-31', 'High', false)

  return (
    <>
    <TaskCard task={task}/>
    </>
  )
}

export default App
