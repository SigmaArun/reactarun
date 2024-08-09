test('renders Login button when not logged in', () => {
    const { getByText } = render(<Header />);
    const loginButton = getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });
  