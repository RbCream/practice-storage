// src/App.js
import { useState } from 'react';
import styled from 'styled-components';
import InputComponent from './components/InputComponent';
import DisplayComponent from './components/DisplayComponent';
import Hello from './components/hello';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
    const [receivedData, setReceivedData] = useState('');

    const handleDataReceived = (data) => {
        setReceivedData(data);
    };

    return (
        <AppContainer>
            <h1>Data Exchange App</h1>
            <InputComponent onDataReceived={handleDataReceived} />
            <DisplayComponent data={receivedData} />
            <Hello text="안녕하세요" />
        </AppContainer>
    );
}

export default App;