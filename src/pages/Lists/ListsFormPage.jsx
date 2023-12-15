import { Card, Button, Form } from 'react-bootstrap';
import { createlist, deletelists,  getTasklist , updatelists } from '../../api/tasklists.api';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';


export function ListsFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

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

  useEffect(() => {
    console.log(params.id); // Agrega esta línea
    async function loadTasklists() {
      if (params.id) {
        const { data: { title } } = await getTasklist(params.id);
        setValue('title', title);
      }
    }
    loadTasklists();
  }, [params.id, setValue]);
  

  const showToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
      style: {
        background: "#3f7d63",
        color: "#fff"
      }
    });
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
