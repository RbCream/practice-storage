import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 20px 0;
    text-align: center;
`;

const Logo = styled.img`
    width: 276px;
    height: 70px;
`;

const Header = () => (
    <HeaderWrapper>
        <Logo src="/logo.png" alt="POPSPOT" />
    </HeaderWrapper>
);

export default Header;