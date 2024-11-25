import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
    width: 768px;
    height: 400px;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const BannerText = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const Banner = () => (
    <BannerWrapper>
        <BannerImage src="/banner-image.png" alt="배너 이미지" />
        <BannerText>

        </BannerText>
    </BannerWrapper>
);

export default Banner;