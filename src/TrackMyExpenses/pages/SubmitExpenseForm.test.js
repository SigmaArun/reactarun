import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import { Provider } from 'react-redux';
import store from '../reduxstore/store';
import axios from 'axios';

jest.mock('axios');

test('submitting the expense form triggers an API call', async () => {
  axios.post.mockResolvedValue({ data: { name: '1' } });

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );

  fireEvent.change(getByPlaceholderText(/Amount/i), { target: { value: '500' } });
  fireEvent.change(getByPlaceholderText(/Description/i), { target: { value: 'Groceries' } });
  fireEvent.change(getByPlaceholderText(/Category/i), { target: { value: 'Food' } });

  fireEvent.click(getByText(/Add Expense/i));

  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  expect(axios.post).toHaveBeenCalledWith('https://trackmyexpenses-5d3c6-default-rtdb.firebaseio.com/userdata.json', expect.any(Object));
});
