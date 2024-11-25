import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;