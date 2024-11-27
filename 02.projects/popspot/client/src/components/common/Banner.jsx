// src/components/common/Banner.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
    width: 768px;
    height: 400px;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
`;

const BannerSlide = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: translateX(${props => props.translateX}px);
    width: ${props => props.width * props.totalSlides}px;
`;

const BannerImage = styled.img`
    width: 768px;
    height: 400px;
    object-fit: cover;
    flex-shrink: 0;
`;

const Arrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 16px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;

    &.prev {
        left: 20px;
    }

    &.next {
        right: 20px;
    }
`;

const Indicators = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
`;

const Indicator = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    cursor: pointer;
`;

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerImages = [
        '/banner1.png',
        '/banner2.png',
        '/banner3.png'
    ];

    const nextSlide = () => {
        setCurrentSlide(current =>
            current === bannerImages.length - 1 ? 0 : current + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(current =>
            current === 0 ? bannerImages.length - 1 : current - 1
        );
    };

    const handleTransitionEnd = () => {
        if (currentSlide === bannerImages.length) {
            setCurrentSlide(0);
            document.querySelector(BannerSlide).style.transition = 'none';
            document.querySelector(BannerSlide).style.transform = `translateX(0)`;
            setTimeout(() => {
                document.querySelector(BannerSlide).style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <BannerWrapper>
            <BannerSlide
                translateX={-currentSlide * 768}
                width={768}
                totalSlides={bannerImages.length}
                onTransitionEnd={handleTransitionEnd}
            >
                {bannerImages.map((image, index) => (
                    <BannerImage key={index} src={image} alt={`배너 ${index + 1}`} />
                ))}
            </BannerSlide>

            <Arrow className="prev" onClick={prevSlide}>❮</Arrow>
            <Arrow className="next" onClick={nextSlide}>❯</Arrow>

            <Indicators>
                {bannerImages.map((_, index) => (
                    <Indicator
                        key={index}
                        active={currentSlide === index}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </Indicators>
        </BannerWrapper>
    );
};

export default Banner;