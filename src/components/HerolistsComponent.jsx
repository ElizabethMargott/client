/* eslint-disable react/prop-types */
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTasksByTaskListId } from '../api/tasks.api';

export function HerolistsComponent({ tasklists }) {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const tasksPromises = tasklists.map(async (tasklist) => {
                    const response = await getTasksByTaskListId(tasklist.id);
                    return response.data;
                });

                const allTasks = await Promise.all(tasksPromises);
                setTasks(allTasks.flat());
            } catch (error) {
                console.error('Error al cargar las tareas', error);
            }
        };

        fetchAllTasks();
    }, [tasklists]);

    return (
        <Container className="hero mt-3">
            {tasklists.map((tasklist) => (
                <Card
                className="hero-card mb-3"
                key={tasklist.id}
                style={{
                    backgroundColor: "#1C1C1C",
                    color: "#fff"
                }} 
                onClick={() => navigate(`/lists/${tasklist.id}`)}

            >
                    <Card.Body style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 1, maxWidth: '100%' }}>
                            <Card.Title className="truncate-text fade-out title-text">
                                {tasklist.title}
                            </Card.Title>
                            {/* Mostrar las tareas para esta lista de tareas */}
                            <ul>
                                {tasks
                                    .filter(task => task.taskListId === tasklist.id)
                                    .map(task => (
                                        <li key={task.id}>{task.content}</li>
                                    ))}
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
