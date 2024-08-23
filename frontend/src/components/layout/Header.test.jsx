// Test: Test file for Header component
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactRouterDom from 'react-router-dom';
import * as AuthContext from '../../context/AuthContext';
import Header from './Header';

// Mocking the necessary modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));
jest.mock('../../utils/localStorageNames', () => ({
  userDataStorage: {
    get: jest.fn(() => ({ username: 'John Doe' }))
  }
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Provide default values for context and hooks
    AuthContext.useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn()
    });
    ReactRouterDom.useNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    }).not.toThrow();
  });
});
