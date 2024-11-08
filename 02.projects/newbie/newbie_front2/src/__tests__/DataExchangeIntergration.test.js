// src/__tests__/DataExchangeIntegration.test.js

import { act } from '@testing-library/react';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('Data Exchange Integration Test', () => {
    it('입력된 데이터가 표시되는지 테스트', async () => {
        axios.post.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: '테스트 데이터' });

        render(<App />);

        const input = screen.getByPlaceholderText('Enter text');
        const sendButton = screen.getByText('Send');

        fireEvent.change(input, { target: { value: '테스트 데이터' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            const displayedData = screen.getByText('테스트 데이터');
            expect(displayedData).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/data', { text: '테스트 데이터' });
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/data');
    });
});