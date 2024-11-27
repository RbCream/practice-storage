import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
`;

const LoginForm = styled.form`
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        id: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.id === 'administrator' && credentials.password === '1234') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/popups');  // 수정된 경로
        } else {
            alert('로그인 실패');
        }
    };

    return (
        <LoginWrapper>
            <LoginForm onSubmit={handleSubmit}>
                <h2>관리자 로그인</h2>
                <Input
                    type="text"
                    placeholder="아이디"
                    value={credentials.id}
                    onChange={(e) => setCredentials({...credentials, id: e.target.value})}
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <Button type="submit">로그인</Button>
            </LoginForm>
        </LoginWrapper>
    );
};

export default AdminLogin;