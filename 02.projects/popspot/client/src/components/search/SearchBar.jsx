import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const SearchInput = styled.input`
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요"
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchContainer>
    );
};

export default SearchBar;