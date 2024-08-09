import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import AuthContext from '../store/AuthContext';

test('renders Logout button when logged in', () => {
  const authCtxValue = { isLoggedIn: true, logout: jest.fn() };
  const { getByText } = render(
    <AuthContext.Provider value={authCtxValue}>
      <Header />
    </AuthContext.Provider>
  );
  const logoutButton = getByText(/Logout/i);
  expect(logoutButton).toBeInTheDocument();
});
