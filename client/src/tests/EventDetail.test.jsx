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

});
