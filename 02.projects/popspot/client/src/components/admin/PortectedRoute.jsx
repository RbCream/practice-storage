// src/components/admin/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';  // 단순 체크

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;