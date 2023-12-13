/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

const BASE_URL = "https://note-nexus.up.railway.app/api/v1/notes";

// Obtener el token JWT almacenado en el local storage (asumiendo que se guarda allí)
const authToken = localStorage.getItem('token');

export const getAllNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${authToken}` // Usar el token JWT como "Bearer token"
            }
        });
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

export const getNotesForKanban = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/kanban`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        // ... manejar errores ...
    }
}

export const getNote = (noteId) => {
    try {
        const response = axios.get(`${BASE_URL}/${noteId}`, {
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

export const createNote = (note) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = axios.post(`${BASE_URL}`, note, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteNote = (noteId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        axios.delete(`${BASE_URL}/${noteId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        throw error;
    }
}

export const updateNote = (noteId, note) => {
    // eslint-disable-next-line no-useless-catch
    try {
        axios.put(`${BASE_URL}/${noteId}`, note, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } catch (error) {
        throw error;
    }
}