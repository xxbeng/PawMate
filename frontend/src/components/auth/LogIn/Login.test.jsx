import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Login from './Login';
// Mock the 'useAuth' function from the 'AuthContext' module for testing purposes.
jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));
// Create a mock function for navigation to simulate navigation events during testing.
const mockNavigate = jest.fn();
// Mock the 'useNavigate' function from 'react-router-dom' for testing, while keeping the rest of the module's exports intact.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Test suite for the Login component
describe('Login Component', () => {
  beforeEach(() => {
    // Setup initial state and mocks for each test
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: null,
      isAuthenticated: false,
      isPendingLogin: false
    }));
  });

  // Test case to check if the login form is rendered with required fields
  it('renders the login form with required fields', () => {
    render(<Login />, { wrapper: BrowserRouter });

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /Register/i })).toBeEnabled();
  });

  // Test case to check if the login function is called with the username and password when the form is submitted
  it('calls login function with the username and password when form is submitted', async () => {
    const mockLogin = jest.fn();
    useAuth.mockImplementation(() => ({
      login: mockLogin,
      loginErrors: null,
      isAuthenticated: false,
      isPendingLogin: false
    }));

    // Render the Login component with the BrowserRouter wrapper
    render(<Login />, { wrapper: BrowserRouter });
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the login function to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  // Test case to check if the user is redirected to the dashboard page when authenticated
  it('navigates to the home page when the user is authenticated', () => {
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: null,
      isAuthenticated: true,
      isPendingLogin: false
    }));

    render(<Login />, { wrapper: BrowserRouter });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  // Test case to check if the error message is displayed when login fails
  it('displays error message if login fails', () => {
    const errorMessage = 'Invalid credentials';
    useAuth.mockImplementation(() => ({
      login: jest.fn(),
      loginErrors: { response: { data: { message: errorMessage } } },
      isAuthenticated: false,
      isPendingLogin: false
    }));

    render(<Login />, { wrapper: BrowserRouter });
    userEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText(/Failed to login/i)).toBeInTheDocument();
  });
});
