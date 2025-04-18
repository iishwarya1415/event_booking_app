import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EventDetail from '../pages/EventDetail';
import { BrowserRouter } from 'react-router-dom';
import api from '../axios';

jest.mock('../axios', () => {
    return {
      get: jest.fn(),
    };
  });
  
// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useNavigate: () => jest.fn(),
}));

// Mock axios
jest.mock('../axios');

// Mock MapContainer
jest.mock('../pages/MapContainer', () => () => <div>Mocked Map</div>);

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('EventDetail', () => {
  it('renders loading state initially', () => {
    renderWithRouter(<EventDetail />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays event details after API call', async () => {
    const mockEvent = {
      id: 123,
      title: 'Sample Event',
      description: 'Sample description',
      venue_name: 'Sample Venue',
      venue_address: '123 Main St',
      event_date: '2025-04-25',
    };

    api.get.mockResolvedValueOnce({ data: mockEvent });

    renderWithRouter(<EventDetail />);

    await waitFor(() => {
      expect(screen.getByText(/sample event/i)).toBeInTheDocument();
      expect(screen.getByText(/sample description/i)).toBeInTheDocument();
      expect(screen.getByText(/sample venue/i)).toBeInTheDocument();
      expect(screen.getByText(/2025-04-25/)).toBeInTheDocument();
      expect(screen.getByText(/google map for: 123 main st/i)).toBeInTheDocument();
      expect(screen.getByText(/mocked map/i)).toBeInTheDocument();
    });
  });

});
