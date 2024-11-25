import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Location = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: white;
    padding: 0.5rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;

    &:before {
        content: "📍";
    }
`;

const Content = styled.div`
  padding: 1rem;
  background: white;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Type = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const PopupCard = ({ popup }) => (
    <Card>
        <ImageWrapper>
            <Image src={popup.image} alt={popup.title} />
            <Location>{popup.location}</Location>
        </ImageWrapper>
        <Content>
            <Title>{popup.title}</Title>
            <Type>{popup.type}</Type>
            <Type>{popup.period}</Type>
        </Content>
    </Card>
);

export default PopupCard;