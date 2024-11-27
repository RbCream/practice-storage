import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    width: 600px;
    max-height: 80vh;
    background: white;
    border-radius: 8px;
    padding: 20px;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const DetailImage = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 4px;
`;

const InfoSection = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    margin-bottom: 16px;
    font-size: 1.5rem;
`;

const InfoItem = styled.p`
    margin: 8px 0;
    line-height: 1.6;
`;

const PopupModal = ({ popup, onClose }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const {
        title,
        organizer,
        content_type,
        location,
        start_date,
        end_date,
        operation_hours,
        description,
        main_image
    } = popup;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>

                <DetailImage
                    src={`http://localhost:4090${main_image}`}
                    alt={title}
                    onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                        e.target.alt = "이미지를 불러올 수 없습니다";
                    }}
                />

                <Title>{title}</Title>

                <InfoSection>
                    <InfoItem><strong>주관업체:</strong> {organizer}</InfoItem>
                    <InfoItem><strong>컨텐츠 종류:</strong> {content_type}</InfoItem>
                    <InfoItem><strong>위치:</strong> {location}</InfoItem>
                    <InfoItem><strong>운영기간:</strong> {formatDate(start_date)} ~ {formatDate(end_date)}</InfoItem>
                    <InfoItem><strong>운영시간:</strong> {operation_hours}</InfoItem>
                </InfoSection>

                <InfoSection>
                    <h3>상세설명</h3>
                    <p>{description}</p>
                </InfoSection>
            </ModalContent>
        </ModalOverlay>
    );
};

export default PopupModal;