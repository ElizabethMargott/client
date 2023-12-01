import { useState } from 'react';

export function HabitsPage() {
  const [habits, setHabits] = useState(['Leer 30 minutos al día', 'Ejercicio matutino']);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Página de Hábitos</h1>
      <AddHabitForm onAddHabit={addHabit} />
      <HabitsList habits={habits} />
    </div>
  );
}

function AddHabitForm({ onAddHabit }) {
  const [newHabit, setNewHabit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHabit(newHabit);
    setNewHabit('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Añadir nuevo hábito"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Añadir</button>
    </form>
  );
}

function HabitsList({ habits }) {
  return (
    <ul style={styles.list}>
      {habits.map((habit, index) => (
        <li key={index} style={styles.listItem}>{habit}</li>
      ))}
    </ul>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '600px',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    color: '#333',
    color: 'white',
  },
  form: {
    margin: '20px 0',
  },
  input: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    marginRight: '8px',
  },
  button: {
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    textAlign: 'left',
    padding: '8px',
    borderBottom: '1px solid #eee',
  },
};
