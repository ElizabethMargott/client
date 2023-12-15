/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://note-nexus.up.railway.app";

export const login = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
        localStorage.setItem('token', response.data.token); // Asume que tu API devuelve un objeto con un campo 'token'
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, email, password) => { // Asume que puedes tener otros campos además de username y password
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, { username, email, password });
        localStorage.setItem('token', response.data.token); // Al registrar, también asume que tu API devuelve un token
        console.log(response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};
