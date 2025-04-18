import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/LandingPage';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
jest.mock('axios');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Dashboard Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays events when API call is successful', async () => {
    const mockEvents = [
      {
        id: 1,
        title: 'Test Event 1',
        description: 'This is the first test event.',
        event_date: '2025-04-18T12:00:00Z',
      },
      {
        id: 2,
        title: 'Test Event 2',
        description: 'This is the second test event.',
        event_date: '2025-05-01T15:30:00Z',
      },
    ];
  
    axios.get.mockResolvedValueOnce({ data: mockEvents });
  
    renderWithRouter(<Dashboard />);
  
    for (const event of mockEvents) {
      await waitFor(() => expect(screen.getByText(event.title)).toBeInTheDocument());
      expect(screen.getByText(event.description)).toBeInTheDocument();
    }
  
    const buttons = screen.getAllByRole('button', { name: /view details/i });
    expect(buttons).toHaveLength(mockEvents.length);
  });
  

  it('displays "No events found." when API returns empty array', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/no events found/i)).toBeInTheDocument();
    });
  });

  it('logs error when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/no events found/i)).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching events:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
