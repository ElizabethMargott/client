import axios from 'axios';

const BASE_URL = "https://note-nexus.up.railway.app/api/v1/tasklists";

// Obtener el token JWT almacenado en el local storage (asumiendo que se guarda allí)
const authToken = localStorage.getItem('token');

export const getTaklists = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
            }
        });
        console.log(response.data);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return window.location.reload();
        }
        throw error; // Si no es un error 403, lanza el error para manejarlo más adelante
    }
}


export const getTasklist = (tasklistId) => {
    try {
        const response = axios.get(`${BASE_URL}/${tasklistId}`, {
            headers: {
                Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
            }
        });
        return response;
    } catch (error) {
        // Chequear si el error es un 403 (Forbidden)
        if (error.response && error.response.status === 403) {
            // Eliminar el token de autenticación del almacenamiento local (o donde lo guardes)
            // localStorage.removeItem('token');
            
            // return window.location.reload(); // Termina la ejecución aquí
        }
        throw error; // Si no es un error 403, lanza el error para manejarlo más adelante
    }
}

export const createlist = (tasklist) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = axios.post(`${BASE_URL}`, tasklist, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const deletelists = (tasklistId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        axios.delete(`${BASE_URL}/${tasklistId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        throw error;
    }
}

export const updatelists = (tasklistId, tasklist) => {
    // eslint-disable-next-line no-useless-catch
    try {
        axios.put(`${BASE_URL}/${tasklistId}`, tasklist, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        throw error;
    }
}