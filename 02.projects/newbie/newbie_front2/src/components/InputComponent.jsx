// src/components/InputComponent.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StyledInput = styled.input`
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const StyledButton = styled.button`
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const InputComponent = ({ onDataReceived }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/data', { text: inputText });
            const receivedData = await axios.get('http://localhost:8080/api/data');
            onDataReceived(receivedData.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <StyledInput
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text"
            />
            <StyledButton onClick={handleSubmit}>Send</StyledButton>
        </div>
    );
};

export default InputComponent;