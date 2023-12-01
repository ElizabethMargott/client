import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function CalendarPage() {
  const [date, setDate] = useState(new Date());

  const onChange = newDate => {
    setDate(newDate);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
    },
    header: {
      margin: '0 0 20px 0',
      color: '#333',
      color: 'white',
    },
    calendar: {
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Calendario</h1>
      <Calendar
        onChange={onChange}
        value={date}
        style={styles.calendar}
      />
    </div>
  );
}
