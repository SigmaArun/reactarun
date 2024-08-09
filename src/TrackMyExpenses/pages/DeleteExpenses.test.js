import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExpenseList from './ExpenseList';
import { Provider } from 'react-redux';
import store from '../reduxstore/store';
import axios from 'axios';

jest.mock('axios');

test('deleting an expense triggers an API call', async () => {
  axios.delete.mockResolvedValue({});

  const { getByText } = render(
    <Provider store={store}>
      <ExpenseList />
    </Provider>
  );

  fireEvent.click(getByText(/Delete/i));
  await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
});
