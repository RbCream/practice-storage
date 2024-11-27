// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4090/api'
});

export const popupAPI = {
    getPopups: (page = 1, filter = 'latest', search = '') =>
        api.get('/popups', { params: { page, filter, search } }),

    createPopup: (formData) =>
        api.post('/popups', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
};

export default api;