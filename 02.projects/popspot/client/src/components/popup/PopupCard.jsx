import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Card = styled.div`
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 300px;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #f5f5f5;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
`;

const Location = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.35rem;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.7rem;

    &:before {
        content: "📍";
        transform: scale(0.7);
    }
`;

const Content = styled.div`
    padding: 1rem;
    background: white;
    position: relative;
`;

const Title = styled.h3`
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    min-height: 1.5rem;
    background-color: ${props => props.empty ? '#f5f5f5' : 'transparent'};
`;

const Type = styled.p`
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    min-height: 1rem;
    background-color: ${props => props.empty ? '#f5f5f5' : 'transparent'};
`;

const AdminButtons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 10px;
`;

const AdminButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    color: white;
    opacity: 0.9;
    transition: opacity 0.2s;

    &.edit {
        background: #4CAF50;
    }

    &.delete {
        background: #f44336;
    }

    &:hover {
        opacity: 1;
    }
`;

const PopupCard = ({ popup, onEdit, onDelete, onCardClick }) => {
    const [imageError, setImageError] = React.useState(false);
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    const handleClick = () => {
        if (popup && !isAdminPage && onCardClick) {
            onCardClick(popup);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        console.log('Edit clicked:', popup);  // 디버깅용
        onEdit && onEdit(popup);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        console.log('Delete clicked:', popup.id);  // 디버깅용
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onDelete && onDelete(popup.id);
        }
    };

    if (!popup) {
        return (
            <Card>
                <ImageWrapper />
                <Content>
                    <Title empty />
                    <Type empty />
                    <Type empty />
                </Content>
            </Card>
        );
    }

    return (
        <Card onClick={handleClick}>
            <ImageWrapper>
                {!imageError ? (
                    <Image
                        src={`http://localhost:4090${popup.main_image}`}
                        alt={popup.title}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <Image
                        src="/uploads/placeholder-image.jpg"
                        alt="이미지를 불러올 수 없습니다"
                    />
                )}
                <Location>{popup.location}</Location>
            </ImageWrapper>
            <Content>
                <Title>{popup.title}</Title>
                <Type>{popup.content_type}</Type>
                <Type>{`${new Date(popup.start_date).toLocaleDateString()} - ${new Date(popup.end_date).toLocaleDateString()}`}</Type>
                {isAdminPage && (
                    <AdminButtons>
                        <AdminButton
                            className="edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit && onEdit(popup);
                            }}
                        >
                            수정
                        </AdminButton>
                        <AdminButton
                            className="delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete && onDelete(popup.id);
                            }}
                        >
                            삭제
                        </AdminButton>
                    </AdminButtons>
                )}
            </Content>
        </Card>
    );
};

export default PopupCard;