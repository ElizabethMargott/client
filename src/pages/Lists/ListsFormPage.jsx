import { Card, Button, Form } from 'react-bootstrap';
import { createlist, deletelists, getTasklist, updatelists } from '../../api/tasklists.api';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getTasksByTaskListId } from '../../api/tasks.api';
import { updateTaskCompletionStatus } from '../../api/tasks.api';


export function ListsFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    async function loadTasklists() {
      if (params.id) {
        const { data: { title } } = await getTasklist(params.id);
        setValue('title', title);

        // Obtener las tareas asociadas a la lista
        const responseTasks = await getTasksByTaskListId(params.id);
        setTasks(responseTasks.data);

        // Inicializar el estado de tareas completadas
        const initialCompletedTasks = responseTasks.data.reduce((acc, task) => {
          acc[task.id] = task.isCompleted;
          return acc;
        }, {});
        setCompletedTasks(initialCompletedTasks);
      }
    }
    loadTasklists();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updatelists(params.id, data);
      showToast('tasklist Actualizada');
    } else {
      await createlist(data);
      showToast('tasklist Creada');
    }
    navigate("/lists");
  });

  const showToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
      style: {
        background: "#3f7d63",
        color: "#fff"
      }
    });
  };
  const handleCheckboxChange = async (taskId) => {
    setCompletedTasks((prevCompletedTasks) => ({
      ...prevCompletedTasks,
      [taskId]: !prevCompletedTasks[taskId],
    }));

    // Actualizar el estado de la tarea en la base de datos
    try {
      await updateTaskCompletionStatus(taskId, !completedTasks[taskId]);
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea', error);
    }
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", { required: true })}
              />
              {errors.title && <Form.Text className="text-danger">This field is required</Form.Text>}
            </Form.Group>

            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={completedTasks[task.id]}
                      onChange={() => handleCheckboxChange(task.id)}
                      id={`taskCheckbox_${task.id}`}
                    />
                    <label
                      className={`form-check-label ${completedTasks[task.id] ? 'completed-task' : ''}`}
                      htmlFor={`taskCheckbox_${task.id}`}
                    >
                      <strong>{task.title}</strong>: {task.content}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            <Button variant="success" type="submit">
              Save
            </Button>
          </Form>
          {params.id &&
            <Button variant="danger" type="submit" className="mt-3" onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deletelists(params.id);
                showToast('tasklist Eliminada');
                navigate("/lists");
              }
            }}>
              Delete
            </Button>}
        </Card.Body>
      </Card>
    </div>
  );
}