import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ExpenseList from './ExpenseList';
import { Provider } from 'react-redux';
import store from '../reduxstore/store';
import axios from 'axios';

jest.mock('axios');

test('displays error message when fetching expenses fails', async () => {
  axios.get.mockRejectedValue(new Error('API Error'));

  const { getByRole } = render(
    <Provider store={store}>
      <ExpenseList />
    </Provider>
  );

  await waitFor(() => getByRole('alert'));
  expect(getByRole('alert')).toHaveTextContent('Failed to load expenses.');
});
