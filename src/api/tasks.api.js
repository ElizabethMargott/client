import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://note-nexus.up.railway.app";

const authToken = localStorage.getItem('token');

export const updateTaskCompletionStatus = async (taskId, isCompleted) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/tasks/${taskId}`,
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
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/tasks?taskListId=${taskListId}`, {
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
