import { useEffect, useState } from 'react';
import { getAllNotes } from '../../api/notes.api';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function ListsPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await getAllNotes();
        setNotes(res.data);
      } catch (error) {
        console.error('Error al cargar las notas', error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div style={styles.container}>
            <Link
                style={{
                    cursor: 'pointer',
                    position: 'fixed',
                    bottom: '108px',
                    right: '20px',
                    backgroundColor: '#333',
                    borderRadius: '50%',
                    padding: '15px',
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.3)'
                }}
                to="/notes-create">
                <AddIcon style={{ color: 'white', fontSize: '24px' }} />
            </Link>
      <h1 style={styles.heading}>Lista de Notas</h1>
      <div style={styles.list}>
        {notes.map((note) => (
          <div key={note.id} style={styles.card}>
            <h3 style={styles.title}>{note.title}</h3>
            <p style={styles.content}>{note.content}</p>
            <p style={styles.description}>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

const styles = {
  container: {
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  card: {
    backgroundColor: '#333',
    border: '1px solid white',
    padding: '10px',
    borderRadius: '5px',
    width: 'calc(50% - 10px)',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  },
  content: {
    margin: '10px 0',
  },
  description: {
    fontStyle: 'italic',
    color: '#ccc',
  },
};
