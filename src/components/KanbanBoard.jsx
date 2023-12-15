import { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import Modal from './Modal';
import kanbanApi from '../api/kanban.api';
import { DragDropContext } from 'react-beautiful-dnd';
import { getNotesForKanban } from '../api/notes.api';

const KanbanBoard = () => {
    const [columns, setColumns] = useState([]);
    const [showModal, setShowModal] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const cols = await kanbanApi.getAllColumns();
            const notes = await getNotesForKanban();
            const columnsWithNotes = cols.map(column => ({
              ...column,
              notes: notes.filter(note => note.kanbanColumnId === column.id)
            }));
            setColumns(columnsWithNotes);
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
      
        fetchData();
      }, []);
      
      const handleAddClick = (columnId) => {
        setActiveColumnId(columnId);
        setShowModal(true); // Muestra el modal o el input para añadir una nueva nota
      };
    
      const handleSaveNote = async () => {
        try {
          const noteData = { title: newNoteTitle, kanbanColumnId: activeColumnId };
          await kanbanApi.createNote(noteData);
          // Actualiza el estado con la nueva nota, puedes necesitar hacer un nuevo fetch o actualizar el estado de las columnas
          setShowModal(false); // Cierra el modal después de guardar
          setNewNoteTitle(''); // Limpia el input
        } catch (error) {
          console.error('Error creating note: ', error);
        }
      };


    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
      
        // Si no hay un destino o el ítem se movió al mismo lugar, no hacer nada.
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
          return;
        }
      
        try {
          // Si el backend se actualiza con éxito, actualiza el estado local
          await kanbanApi.moveNoteToColumn(draggableId, destination.droppableId);
          
          // Encuentra las columnas de origen y destino en el estado
          const sourceColumn = columns.find(column => column.id === parseInt(source.droppableId));
          const destinationColumn = columns.find(column => column.id === parseInt(destination.droppableId));
          
          // Crea nuevas listas de notas para las columnas de origen y destino
          const sourceNotes = Array.from(sourceColumn.notes);
          const [movedNote] = sourceNotes.splice(source.index, 1);
          const destinationNotes = Array.from(destinationColumn.notes);
          destinationNotes.splice(destination.index, 0, movedNote);
      
          // Crea un nuevo array de columnas para el estado
          const newColumns = columns.map(column => {
            if (column.id === sourceColumn.id) {
              return { ...column, notes: sourceNotes };
            } else if (column.id === destinationColumn.id) {
              return { ...column, notes: destinationNotes };
            }
            return column;
          });
      
          // Establece el nuevo estado
          setColumns(newColumns);
        } catch (error) {
          console.error('Error moving note: ', error);
        }
      };
      

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-fluid py-3">
        <div className="row g-3">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} cards={column.cards}  onAddClick={handleAddClick} />
          ))}
        </div>
      </div>
    </DragDropContext>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        {/* Puedes usar un input o un formulario aquí */}
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <button onClick={handleSaveNote}>Save</button>
      </Modal>
    )}
    </>
  );
};

export default KanbanBoard;
