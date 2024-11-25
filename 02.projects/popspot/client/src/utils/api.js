import axios from 'axios';

const BASE_URL = 'http://localhost:4090/api';

export const api = {
    getPopups: async (page = 1, filter = 'latest') => {
        const response = await axios.get(`${BASE_URL}/popups`, {
            params: { page, filter }
        });
        return response.data;
    },

    getPopupById: async (id) => {
        const response = await axios.get(`${BASE_URL}/popups/${id}`);
        return response.data;
    },

    checkAdmin: async (credentials) => {
        return credentials.id === 'administrator' && credentials.password === '1234';
    }
};