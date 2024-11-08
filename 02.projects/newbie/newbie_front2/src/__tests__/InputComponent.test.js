import { act } from '@testing-library/react';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import InputComponent from '../components/InputComponent';

jest.mock('axios');

describe('InputComponent', () => {
    it('sends data and receives response', async () => {
        const mockOnDataReceived = jest.fn();
        render(<InputComponent onDataReceived={mockOnDataReceived} />);

        const input = screen.getByPlaceholderText('Enter text');
        const button = screen.getByText('Send');


        axios.post.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: 'Test data' });

        fireEvent.change(input, { target: { value: 'Test data' } });
        fireEvent.click(button);

        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/data', { text: 'Test data' }));
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/data'));
        await waitFor(() => expect(mockOnDataReceived).toHaveBeenCalledWith('Test data'));
    });

    it('handles input change', () => {
        render(<InputComponent onDataReceived={() => {}} />);
        const input = screen.getByPlaceholderText('Enter text');

        fireEvent.change(input, { target: { value: 'New text' } });

        expect(input.value).toBe('New text');
    });
});