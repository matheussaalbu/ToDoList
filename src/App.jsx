import { useState, useEffect } from 'react'
import './App.css'
import TaskItem from './TaskItem.jsx'

function App() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : []
})
  const [inputValue, setInputValue] = useState('')
  const activeTasks = tasks.filter(task => task.Done === false)
  const completedTasks = tasks.filter(task => task.Done === true)

  const addTask = (task) => {
  if (task.trim() === '') return
  const isDuplicate = tasks.some(t => t.Text.toLowerCase() === task.trim().toLowerCase())
  if (isDuplicate) {
    alert('Task already exists!')
    return
  }
  setTasks([...tasks, {Text: task, Done: false}])
  setInputValue('')
}

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
  <div>
    <h1>ToDoList</h1>
    <div className="inputRow">
      <input type="text" placeholder="Add a new task..." value={inputValue}
        onChange={(el) => setInputValue(el.target.value)}
        onKeyDown={(el) => el.key === 'Enter' && addTask(inputValue)}/>
      <button onClick={() => addTask(inputValue)} className='addBut'>Add Task</button>
    </div>
    <div className="card">
      <p className="cardTitle">To Do</p> 
      <p className='Remaining'>{activeTasks.length} {activeTasks.length === 1 ? 'task' : 'tasks'} left</p>
      <ul>
        {activeTasks.map((task) => {
          const index = tasks.indexOf(task)
          
          return <TaskItem key={index} task={task} index={index} tasks={tasks} setTasks={setTasks} />
        })}
        {activeTasks.length === 0 && <p className='PHText'>no tasks yet...</p>}
      </ul>
    </div>
    <div className="card">
      <p className="cardTitle">Completed</p>
      <p className='Remaining'>{completedTasks.length}{completedTasks.length === 1 ? ' task' : ' tasks'} done</p>
      <ul>
        {completedTasks.map((task) => {
          const index = tasks.indexOf(task)
          return <TaskItem key={index} task={task} index={index} tasks={tasks} setTasks={setTasks} />
        })}
        {completedTasks.length === 0 && <p className='PHText'>no completed tasks yet...</p>}
      </ul>
    </div>
    <button onClick={() => setTasks([])} className='deleteAll'>Delete All</button>
  </div>
)
}

export default App
