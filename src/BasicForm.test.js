import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BasicForm from './BasicForm';

test('renders BasicForm inputs and submit button', () => {
  render(<BasicForm />);
  
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

test('shows phone validation error if phone is invalid', async () => {
  render(<BasicForm />);
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByText(/phone must be 10 digits/i)).toBeInTheDocument();
});

test('successfully adds a new entry when inputs are valid', async () => {
  render(<BasicForm />);

  fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/phone number/i), { target: { value: '1234567890' } });

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByText(/john doe - john@example.com - 1234567890/i)).toBeInTheDocument();
});

