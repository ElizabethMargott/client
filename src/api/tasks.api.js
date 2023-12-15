import axios from 'axios';

const BASE_URL = "https://note-nexus.up.railway.app/api/v1/tasks";

const authToken = localStorage.getItem('token');

export const updateTaskCompletionStatus = async (taskId, isCompleted) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${taskId}`,
      { isCompleted },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea', error);
    throw error;
  }
};

export const getTasksByTaskListId = async (taskListId) => {
    try {
        const response = await axios.get(`${BASE_URL}?taskListId=${taskListId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        console.log(response.data);
        return response;
    } catch (error) {
        throw error;
    }
};
