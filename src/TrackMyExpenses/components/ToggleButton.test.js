test('renders theme toggle button in Header', () => {
    const { getByText } = render(<Header />);
    const toggleButton = getByText(/Switch to Dark Theme/i);
    expect(toggleButton).toBeInTheDocument();
  });
  