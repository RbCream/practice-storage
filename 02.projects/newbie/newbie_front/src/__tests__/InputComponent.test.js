import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import InputComponent from '../InputComponent';

jest.mock('axios');
console.error = jest.fn(); // Mock console error
console.log = jest.fn(); // Mock console log

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

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/data', { text: 'Test data' });
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/data');
            expect(mockOnDataReceived).toHaveBeenCalledWith('Test data');
            expect(console.log).toHaveBeenCalledWith('성공했습니다');
        });
    });

    it('handles error when API call fails', async () => {
        const mockOnDataReceived = jest.fn();
        render(<InputComponent onDataReceived={mockOnDataReceived} />);

        const input = screen.getByPlaceholderText('Enter text');
        const button = screen.getByText('Send');

        axios.post.mockRejectedValueOnce(new Error('API Error'));

        fireEvent.change(input, { target: { value: 'Test data' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
        });
    });

    it('updates input value when typing', () => {
        render(<InputComponent onDataReceived={() => {}} />);
        const input = screen.getByPlaceholderText('Enter text');

        fireEvent.change(input, { target: { value: 'New text' } });

        expect(input.value).toBe('New text');
    });
});