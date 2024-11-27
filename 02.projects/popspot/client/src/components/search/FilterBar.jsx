// src/components/search/FilterBar.jsx
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
`;

const FilterButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: ${props => props.active ? '#333' : 'white'};
    color: ${props => props.active ? 'white' : '#333'};
    cursor: pointer;

    // 첫 번째 버튼
    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    // 마지막 버튼
    &:last-child {
        border-radius: 0 4px 4px 0;
    }

    // 버튼 사이 테두리 중복 제거
    & + & {
        border-left: none;
    }

    &:hover {
        background: #f5f5f5;
        color: #333;
    }
`;

const FilterBar = ({ activeFilter, onFilter }) => {
    return (
        <FilterContainer>
            <FilterButton
                active={activeFilter === 'latest'}
                onClick={() => onFilter('latest')}
            >
                최신순
            </FilterButton>
            <FilterButton
                active={activeFilter === 'views'}
                onClick={() => onFilter('views')}
            >
                조회순
            </FilterButton>
            <FilterButton
                active={activeFilter === 'deadline'}
                onClick={() => onFilter('deadline')}
            >
                마감일순
            </FilterButton>
        </FilterContainer>
    );
};

export default FilterBar;
