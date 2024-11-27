import { useState } from 'react';
import axios from 'axios';

export const usePopup = () => {
    const [popups, setPopups] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPopups = async (page = 1, filter = 'latest', search = '') => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4090/api/popups', {
                params: { page, filter, search }
            });
            if (response.data.success) {
                setPopups(response.data);
                setTotalPages(Math.ceil(response.data.data.length / 8));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createPopup = async (formData) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4090/api/popups', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                setPopups(prev => ({
                    ...prev,
                    data: [...prev.data, response.data.data]
                }));
                return response.data.data;
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePopup = async (id, formData) => {
        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:4090/api/popups/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                setPopups(prev => ({
                    ...prev,
                    data: prev.data.map(popup =>
                        popup.id === id ? response.data.data : popup
                    )
                }));
                return response.data.data;
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deletePopup = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4090/api/popups/${id}`);
            if (response.data.success) {
                fetchPopups(); // 목록 새로고침
            }
        } catch (err) {
            console.error('삭제 실패:', err);
        }
    };

    return {
        popups,
        loading,
        error,
        totalPages,
        fetchPopups,
        createPopup,
        updatePopup,
        deletePopup
    };
};