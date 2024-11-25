import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Banner from '../components/common/Banner';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import PopupList from '../components/popup/PopupList';
import Pagination from '../components/common/Pagination';
import { usePopup } from '../hooks/usePopup';

const PageWrapper = styled.div`
  width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const MainPage = () => {
    const { popups, loading, error, setFilter, setPage, page } = usePopup();

    return (
        <PageWrapper>
            <Header />
            <Banner />
            <SearchFilterContainer>
                <FilterBar onFilter={setFilter} />
                <SearchBar />
            </SearchFilterContainer>
            <PopupList popups={popups} />
            <SearchFilterContainer>
                <FilterBar onFilter={setFilter} />
                <SearchBar />
            </SearchFilterContainer>
            <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />
        </PageWrapper>
    );
};

export default MainPage;