// src/components/common/Header.jsx
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const HeaderWrapper = styled.header`
    width: 100%;
    background: white;
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
`;

const HeaderContent = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    display: flex;
    justify-content: center;
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Logo = styled.img`
    width: 276px;
    height: 70px;
`;

const AdminButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #444;
    }
`;

const Header = ({ showForm, setShowForm }) => {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    return (
        <HeaderWrapper>
            <HeaderContent>
                <LogoWrapper>
                    <Link to="/">
                        <Logo src="/logo.png" alt="POPSPOT" />
                    </Link>
                </LogoWrapper>
            </HeaderContent>
        </HeaderWrapper>
    );
};

export default Header;