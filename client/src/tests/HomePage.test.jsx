import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';

describe('Homepage Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
  });

  test('renders welcome heading', () => {
    expect(screen.getByText(/Welcome to ShowBuzz/i)).toBeInTheDocument();
  });

  test('renders description subheading', () => {
    expect(screen.getByText(/Your Ultimate Destination/i)).toBeInTheDocument();
  });

  test('renders paragraph with platform description', () => {
    expect(
      screen.getByText(/Discover and book tickets for the latest events/i)
    ).toBeInTheDocument();
  });

  test('renders Login and Register links with correct hrefs', () => {
    const loginLink = screen.getByText(/Login/i);
    const registerLink = screen.getByText(/Register/i);

    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');

    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest('a')).toHaveAttribute('href', '/register');
  });
});
