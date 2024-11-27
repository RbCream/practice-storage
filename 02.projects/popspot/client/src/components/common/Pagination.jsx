// src/components/common/Pagination.jsx
import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 20px 0;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: ${props => props.active ? '#333' : 'white'};
    color: ${props => props.active ? 'white' : '#333'};
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background: #f5f5f5;
        color: #333;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <PaginationWrapper>
            {[...Array(totalPages)].map((_, i) => (
                <PageButton
                    key={i + 1}
                    active={currentPage === i + 1}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </PageButton>
            ))}
        </PaginationWrapper>
    );
};

export default Pagination;