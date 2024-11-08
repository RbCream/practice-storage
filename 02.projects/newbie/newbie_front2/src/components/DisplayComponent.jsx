// src/components/DisplayComponent.js
import React from 'react';
import styled from 'styled-components';

const StyledDisplay = styled.div`
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const DisplayComponent = ({ data }) => {
    return (
        <StyledDisplay>
            <h3>Received Data:</h3>
            <p>{data}</p>
        </StyledDisplay>
    );
};

export default DisplayComponent;