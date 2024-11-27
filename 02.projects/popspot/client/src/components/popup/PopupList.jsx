import React, { useState } from 'react';
import styled from 'styled-components';
import PopupCard from './PopupCard';
import PopupModal from './PopupModal';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 20px 0;
    width: 768px;
    margin: 0 auto;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 40px 0;
    grid-column: span 2;
    color: #666;
`;

const PopupList = ({ popups }) => {
    const [selectedPopup, setSelectedPopup] = useState(null);
    const emptyCards = Array(8).fill(null);

    const handleCardClick = (popup) => {
        setSelectedPopup(popup);
    };

    const handleCloseModal = () => {
        setSelectedPopup(null);
    };

    if (!popups || !popups.data) {
        return (
            <ListContainer>
                {emptyCards.map((_, index) => (
                    <PopupCard key={`empty-${index}`} popup={null} />
                ))}
            </ListContainer>
        );
    }

    if (popups.data.length === 0) {
        return <EmptyMessage>등록된 팝업스토어가 없습니다.</EmptyMessage>;
    }

    return (
        <>
            <ListContainer>
                {popups.data.map(popup => (
                    <PopupCard
                        key={popup.id}
                        popup={popup}
                        onCardClick={handleCardClick}
                    />
                ))}
            </ListContainer>

            {selectedPopup && (
                <PopupModal
                    popup={selectedPopup}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default PopupList;