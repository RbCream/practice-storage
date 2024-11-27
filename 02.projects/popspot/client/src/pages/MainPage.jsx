// src/pages/MainPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Banner from '../components/common/Banner';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import PopupList from '../components/popup/PopupList';
import Pagination from '../components/common/Pagination';
import { usePopup } from '../hooks/usePopup';

const MainContainer = styled.div`
    width: 768px;
    margin: 0 auto;
`;

const SearchSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

const MainPage = () => {
    const { popups, totalPages, fetchPopups } = usePopup();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchPopups(currentPage);
    }, [currentPage]);

    return (
        <>
            <Header />
            <MainContainer>
                <Banner />
                <SearchSection>
                    <FilterBar />
                    <SearchBar />
                </SearchSection>
                <PopupList popups={popups} />
                <SearchSection>
                    <FilterBar />
                    <SearchBar />
                </SearchSection>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </MainContainer>

            <Footer />
        </>
    );
};

export default MainPage;