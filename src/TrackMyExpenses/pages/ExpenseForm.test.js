import React from 'react';
import { render } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';

test('renders ExpenseForm component', () => {
  const { getByPlaceholderText } = render(<ExpenseForm />);
  expect(getByPlaceholderText(/Amount/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Description/i)).toBeInTheDocument();
});
