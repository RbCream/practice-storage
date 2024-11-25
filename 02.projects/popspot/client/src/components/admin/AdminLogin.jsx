import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminLogin = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        id: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.id === 'administrator' && credentials.password === '1234') {
            onLogin(true);
        } else {
            alert('로그인 정보가 올바르지 않습니다.');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
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
        </LoginContainer>
    );
};

export default AdminLogin;