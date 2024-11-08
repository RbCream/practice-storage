import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Data Exchange App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Data Exchange App/i);
  expect(headingElement).toBeInTheDocument();
});