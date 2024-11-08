// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import InputComponent from './components/InputComponent';
import DisplayComponent from './components/DisplayComponent';

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
      </AppContainer>
  );
}

export default App;