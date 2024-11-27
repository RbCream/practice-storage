// src/components/search/SearchBar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    margin-left: auto;  // 우측 정렬 유지
`;

const SearchInput = styled.input`
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    width: 200px;
    border-right: none;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background: #333;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
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