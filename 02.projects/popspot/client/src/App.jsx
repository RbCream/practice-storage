// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin');

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;