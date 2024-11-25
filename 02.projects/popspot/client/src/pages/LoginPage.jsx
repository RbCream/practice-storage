import React from 'react';
import styled from 'styled-components';
import AdminLogin from '../components/admin/AdminLogin';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
`;

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (success) => {
        if (success) {
            navigate('/admin');
        }
    };

    return (
        <LoginWrapper>
            <AdminLogin onLogin={handleLogin} />
        </LoginWrapper>
    );
};

export default LoginPage;