test('renders SignUp button in Header', () => {
    const { getByText } = render(<Header />);
    const signUpButton = getByText(/SignUp/i);
    expect(signUpButton).toBeInTheDocument();
  });
  