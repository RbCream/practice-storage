// 안녕하세요 글씨가 가운데에서 위아래로 흔들리는 컴포넌트

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHello = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    animation: shake 0.5s infinite;
    @keyframes shake {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;

const Hello = ({ text }) => {
    return (
        <StyledHello>{text}</StyledHello>
    );
}

Hello.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Hello;
