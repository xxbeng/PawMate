// Test: DogWalkingPlaces Component
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import DogWalkingPlaces from './DogWalkingPlaces';

// Mocking the React Query hook
jest.mock('../../../queries/thridParties', () => ({
  useGetPlacesToWalkMyDog: jest.fn()
}));

// Mocking navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    success({
      coords: {
        latitude: 50,
        longitude: 50
      }
    })
  )
};
global.navigator.geolocation = mockGeolocation; // Mocking the geolocation API

describe('DogWalkingPlaces Component', () => {
  // Creating a new instance of QueryClient
  const queryClient = new QueryClient();

  // Clearing the query client and resetting the mocks before each test
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  // Loading state should be displayed initially
  it('renders loading state initially', () => {
    const { useGetPlacesToWalkMyDog } = require('../../../queries/thridParties');
    useGetPlacesToWalkMyDog.mockReturnValue({
      data: undefined,
      isLoading: true
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DogWalkingPlaces />
      </QueryClientProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // Display places once data is loaded
  it('displays places once data is loaded', async () => {
    const { useGetPlacesToWalkMyDog } = require('../../../queries/thridParties');
    useGetPlacesToWalkMyDog.mockReturnValue({
      data: {
        answer: [
          {
            name: 'Central Park',
            distancesByWalk: '2',
            timeByWalk: '30',
            distancesByCar: '5',
            timeByCar: '10'
          }
        ]
      },
      isLoading: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DogWalkingPlaces />
      </QueryClientProvider>
    );

    // Checking if the places are displayed
    await waitFor(() => {
      expect(screen.getByText('Central Park')).toBeInTheDocument();
      expect(screen.getByText('Walk: 2 km, 30 mins')).toBeInTheDocument();
      expect(screen.getByText('Car: 5 km, 10 mins')).toBeInTheDocument();
    });
  });

  // Handles errors in location fetching
  it('handles errors in location fetching', async () => {
    // Mocking the error in geolocation
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error({
        message: 'Error occurred while getting location'
      })
    );

    // Placeholder code
    const { useGetPlacesToWalkMyDog } = require('../../../queries/thridParties');
    useGetPlacesToWalkMyDog.mockReturnValue({
      data: undefined,
      isLoading: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DogWalkingPlaces />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Central Park')).not.toBeInTheDocument();
    });
  });
});
