import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
`;

const FilterBar = ({ onFilter }) => {
    return (
        <FilterContainer>
            <Select onChange={(e) => onFilter(e.target.value)}>
                <option value="latest">최신순</option>
                <option value="views">조회순</option>
                <option value="deadline">마감일순</option>
            </Select>
        </FilterContainer>
    );
};

export default FilterBar;