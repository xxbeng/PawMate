// Jest test for HomePage component
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APPLICATION_PATH } from '../../utils/urlRoutes';
import HomePage from './HomePage';

// Mocking modules and components
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Helper function to wrap the component with a router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Router>{ui}</Router>);
};

describe('HomePage', () => {
  it('should render without crashing', () => {
    useAuth.mockImplementation(() => ({ isAuthenticated: false }));
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Paw Mate/i)).toBeInTheDocument();
  });

  it('should redirect to dashboard if authenticated', async () => {
    useAuth.mockImplementation(() => ({ isAuthenticated: true }));
    renderWithRouter(<HomePage />);
    await waitFor(() => {
      expect(window.location.pathname).toBe(APPLICATION_PATH.dashboard);
    });
  });

  it('should display login and sign up buttons', () => {
    useAuth.mockImplementation(() => ({ isAuthenticated: false }));
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
