/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';

const KanbanCard = ({ note, index }) => {
  return (
    <Draggable draggableId={note.id.toString()} index={index}>
      {(provided) => (
        <div
          className="card mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body">
            {/* <p className="card-text">{note.title}</p> */}
            <p className="card-text">{note.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;