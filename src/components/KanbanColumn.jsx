/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ column }) => {
  return (
    <div className="col-md-4">
      <div className="card bg-light">
        <div className="card-header text-center text-white bg-primary">
          <h4 className="mb-0">{column.name}</h4>
        </div>
        <Droppable droppableId={column.id.toString()}>
          {(provided) => (
            <div 
              className="card-body" 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              {column.notes && column.notes.map((note, index) => (
                <KanbanCard key={note.id} note={note} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="card-footer">
          <button className="btn btn-primary btn-sm">Add Card</button>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;