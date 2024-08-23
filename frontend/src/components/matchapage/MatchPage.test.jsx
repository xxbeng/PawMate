// Test: MatchPage component renders without crashing
/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchPage from './MatchPage'; // Ensure the path is correct
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Mock necessary hooks and external modules
jest.mock('../../queries/friends', () => ({
  useLikeDogMutation: () => ({
    mutate: jest.fn()
  })
}));

jest.mock('../../queries/matches', () => ({
  useGetPotentialMates: () => ({
    data: [{ id: '1', name: 'Rover', breed: 'Labrador', age: '4', neutered: 'yes' }],
    isLoading: false,
    error: null,
    refetch: jest.fn()
  })
}));

// AllProviders component to wrap the MatchPage component
const AllProviders = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

// Test MatchPage renders without crashing
test('Renders MatchPage component', () => {
  render(
    <AllProviders>
      <MatchPage />
    </AllProviders>
  );

  // Assert that the MatchPage component is rendered
  const matchPageElement = screen.getByTestId('match-page');
  expect(matchPageElement).toBeInTheDocument();
});

// Test filter toggle button renders without crashing
test('Renders filter toggle button', () => {
  render(
    <AllProviders>
      <MatchPage />
    </AllProviders>
  );

  // Assert that the filter toggle button is rendered
  const filterToggleButton = screen.getByTestId('filter-toggle-button');
  expect(filterToggleButton).toBeInTheDocument();
});

// Test friend list button renders without crashing
test('Renders friend list button', () => {
  render(
    <AllProviders>
      <MatchPage />
    </AllProviders>
  );

  // Assert that the friend list button is rendered
  const friendListButton = screen.getByTestId('friend-list-button');
  expect(friendListButton).toBeInTheDocument();
});

// Test like swipe-left-button renders without crashing
test('Renders swipe-left-button', () => {
  render(
    <AllProviders>
      <MatchPage />
    </AllProviders>
  );

  // Assert that the like swipe-left-button is rendered
  const swipeLeftButton = screen.getByTestId('swipe-left-button');
  expect(swipeLeftButton).toBeInTheDocument();
});

// Test like swipe-right-button renders without crashing
test('Renders swipe-right-button', () => {
  render(
    <AllProviders>
      <MatchPage />
    </AllProviders>
  );

  // Assert that the like swipe-right-button is rendered
  const swipeRightButton = screen.getByTestId('swipe-right-button');
  expect(swipeRightButton).toBeInTheDocument();
});
