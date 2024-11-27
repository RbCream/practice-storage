// src/components/common/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    width: 100%;
    height: 87px;
    background: #333;
    color: white;
`;

const FooterContent = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-size: 14px;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <FooterContent>
                <p>이용약관 · 개인정보 처리방침 · 문의하기</p>
                <p>© 2024 POPSPOT. All rights reserved.</p>
            </FooterContent>
        </FooterWrapper>
    );
};

export default Footer;