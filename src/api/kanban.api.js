/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL || "https://note-nexus.up.railway.app/api/v1/kanban";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/kanban`,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const kanbanApi = {
  getAllColumns: async () => {
    try {
      const response = await apiClient.get('/columns');
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createColumn: async (columnData) => {
    try {
      const response = await apiClient.post('/columns', columnData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateColumn: async (columnId, columnData) => {
    try {
      const response = await apiClient.put(`/columns/${columnId}`, columnData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteColumn: async (columnId) => {
    try {
      await apiClient.delete(`/columns/${columnId}`);
    } catch (error) {
      throw error;
    }
  },
  createNote: async (columnId, noteData) => {
    try {
      const response = await apiClient.post(`/notes?columnId=${columnId}`, noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateNote: async (noteId, noteData) => {
    try {
      const response = await apiClient.put(`/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteNote: async (noteId) => {
    try {
      await apiClient.delete(`/notes/${noteId}`);
    } catch (error) {
      throw error;
    }
  },
  moveNoteToColumn: async (noteId, columnId) => {
    try {
      await apiClient.post(`/notes/${noteId}/move/${columnId}`);
    } catch (error) {
      throw error;
    }
  }
};

export default kanbanApi;
