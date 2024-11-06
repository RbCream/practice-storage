import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

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
            await axios.post('http://localhost:8080/api/data', { text: inputText });
            const receivedData = await axios.get('http://localhost:8080/api/data');
            onDataReceived(receivedData.data);
            console.log('성공했습니다');
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

InputComponent.propTypes = {
    onDataReceived: PropTypes.func.isRequired,
};

export default InputComponent;