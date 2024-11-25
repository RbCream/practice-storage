import React from 'react';
import styled from 'styled-components';
import PopupCard from './PopupCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px 0;
`;

const PopupList = ({ popups }) => (
    <GridContainer>
        {popups.map((popup) => (
            <PopupCard key={popup.id} popup={popup} />
        ))}
    </GridContainer>
);

export default PopupList;