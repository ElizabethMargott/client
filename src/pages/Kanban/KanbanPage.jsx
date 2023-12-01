import { useState } from 'react';

export function KanbanPage() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask) {
      setTasks({
        ...tasks,
        todo: [...tasks.todo, newTask],
      });
      setNewTask('');
    }
  };

  const kanbanStyle = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
    },
    column: {
      flex: '1',
      margin: '0 10px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      padding: '10px',
    },
    header: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    task: {
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '3px',
      marginBottom: '10px',
    },
    addTaskForm: {
      marginBottom: '20px',
    },
  };

  return (
    <div style={kanbanStyle.container}>
      <div style={kanbanStyle.addTaskForm}>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Añadir nueva tarea" 
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      {/* Columna 1: Por Hacer */}
      <div style={kanbanStyle.column}>
        <div style={kanbanStyle.header}>Por Hacer</div>
        {tasks.todo.map((task, index) => (
          <div key={index} style={kanbanStyle.task}>{task}</div>
        ))}
      </div>

      {/* Columna 2: En Progreso */}
      <div style={kanbanStyle.column}>
        <div style={kanbanStyle.header}>En Progreso</div>
        {tasks.inProgress.map((task, index) => (
          <div key={index} style={kanbanStyle.task}>{task}</div>
        ))}
      </div>

      {/* Columna 3: Hecho */}
      <div style={kanbanStyle.column}>
        <div style={kanbanStyle.header}>Hecho</div>
        {tasks.done.map((task, index) => (
          <div key={index} style={kanbanStyle.task}>{task}</div>
        ))}
      </div>
    </div>
  );
}
