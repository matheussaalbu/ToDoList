import React from 'react'

function TaskItem({ task, index, tasks, setTasks }) {
  return (
    <li>
      <button className="doneBtn"
        onClick={() => setTasks(tasks.map((taref, indice) =>
          indice === index ? {...taref, Done: !taref.Done} : taref))}>
        {task.Done ? 'Undo' : 'Done'}
      </button>
      <span className={`taskText ${task.Done ? 'done' : ''}`}>
        {task.Text}
      </span>
      <button className="deleteBtn"
        onClick={() => setTasks(tasks.filter((_, indice) => indice !== index))}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem