import { useEffect, useState } from 'react';
import { getTaklists } from '../../api/tasklists.api';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { HerolistsComponent } from '../../components/HerolistsComponent';

export function ListsPage() {
  const [tasklists, setTasklists] = useState([]);

  useEffect(() => {
    async function loadTasklists() {
      try {
        const res = await getTaklists();
        setTasklists(res.data);
      } catch (error) {
        console.error('Error al cargar las notas', error);
      }
    }
    loadTasklists();
  }, []);

  return (
    <><HerolistsComponent tasklists={tasklists} /><Link
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
      to="/lists-create">
      <AddIcon style={{ color: 'white', fontSize: '24px' }} />
    </Link></>
    
  );
}

const styles = {
  container: {
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
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
