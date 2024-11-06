import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDisplay = styled.div`
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const DisplayComponent = ({ data }) => {
    return (
        <StyledDisplay>
            <h3>Received Data:</h3>
            <p>{data}</p>
        </StyledDisplay>
    );
};

DisplayComponent.propTypes = {
    data: PropTypes.string.isRequired,
};

export default DisplayComponent;