import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpenseForm from './ExpenseForm';
import { Provider } from 'react-redux';
import store from '../reduxstore/store';

test('clicking Activate Premium button dispatches action', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
  fireEvent.click(getByText(/Activate Premium/i));
  expect(store.getState().theme.darkMode).toBe(true);
});

