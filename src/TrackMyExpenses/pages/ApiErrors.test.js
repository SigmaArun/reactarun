import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import { Provider } from 'react-redux';
import store from '../reduxstore/store';
import axios from 'axios';

jest.mock('axios');

test('displays error message when API call fails on form submission', async () => {
  axios.post.mockRejectedValue(new Error('API Error'));

  const { getByPlaceholderText, getByText, getByRole } = render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );

  fireEvent.change(getByPlaceholderText(/Amount/i), { target: { value: '500' } });
  fireEvent.change(getByPlaceholderText(/Description/i), { target: { value: 'Groceries' } });
  fireEvent.change(getByPlaceholderText(/Category/i), { target: { value: 'Food' } });

  fireEvent.click(getByText(/Add Expense/i));

  await waitFor(() => getByRole('alert'));
  expect(getByRole('alert')).toHaveTextContent('Failed to add expense. Please try again.');
});
