// Test: Weather Component
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Weather from './Weather';

// Mocking the React Query hook
jest.mock('../../../queries/thridParties', () => ({
  useGetWeather: jest.fn()
}));

// Mocking navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    success({
      coords: {
        latitude: 36.8404,
        longitude: 174.7399
      }
    })
  )
};
global.navigator.geolocation = mockGeolocation;

describe('Weather Component', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mocking the weather data
    const { useGetWeather } = require('../../../queries/thridParties');
    useGetWeather.mockReturnValue({
      data: undefined,
      isLoading: true
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays weather data once loaded', async () => {
    // Mocking the weather data
    const { useGetWeather } = require('../../../queries/thridParties');
    useGetWeather.mockReturnValue({
      data: {
        main: { temp: 15, humidity: 78 },
        weather: [{ description: 'Light rain' }],
        wind: { speed: 5 },
        isGoodDayForWalk: true
      },
      isLoading: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    );

    // Checking if the weather data is displayed
    await waitFor(() => {
      expect(screen.getByText('Temp: 15°C')).toBeInTheDocument();
      expect(screen.getByText('Humidity: 78%')).toBeInTheDocument();
      expect(screen.getByText('Wind: 5 m/s')).toBeInTheDocument();
      expect(screen.getByText('Light rain')).toBeInTheDocument();
      expect(screen.getByText('Good day for walking your dog!')).toBeInTheDocument();
    });
  });

  // Test for handling errors in geolocation fetching
  it('handles errors in geolocation fetching', async () => {
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error({
        message: 'Error occurred while getting location'
      })
    );

    // Mocking the weather data
    const { useGetWeather } = require('../../../queries/thridParties');
    useGetWeather.mockReturnValue({
      data: undefined,
      isLoading: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Temp: 15°C')).not.toBeInTheDocument();
    });
  });
});
