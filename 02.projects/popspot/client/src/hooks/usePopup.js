import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const usePopup = () => {
    const [popups, setPopups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('latest');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                setLoading(true);
                const data = await api.getPopups(page, filter);
                setPopups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopups();
    }, [page, filter]);

    return { popups, loading, error, setFilter, setPage, page };
};