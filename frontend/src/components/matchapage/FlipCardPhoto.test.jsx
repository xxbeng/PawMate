// Test: Test the FlipCardPhoto component
/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FlipCardPhoto from './FlipCardPhoto';
import { useGetPhotos } from '../../queries/photos';

// Mock the useGetPhotos custom hook
jest.mock('../../queries/photos', () => ({
  useGetPhotos: jest.fn()
}));

describe('FlipCardPhoto', () => {
  // Mock photos data
  const mockPhotos = [{ url: 'dog1.jpg' }, { url: 'dog2.jpg' }];

  // Set up the mock hook to return the mock data
  beforeEach(() => {
    useGetPhotos.mockReturnValue({
      data: mockPhotos,
      isLoading: false,
      error: null
    });
  });

  // photos should render correctly
  it('renders the photos correctly', () => {
    render(<FlipCardPhoto id="1" />);
    expect(screen.getByText('Dog Photos')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  // test loading state
  it('handles loading state', () => {
    useGetPhotos.mockReturnValue({ isLoading: true });
    render(<FlipCardPhoto id="1" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // test error state
  it('handles error state', () => {
    useGetPhotos.mockReturnValue({ error: { message: 'Error fetching data' } });
    render(<FlipCardPhoto id="1" />);
    expect(screen.getByText('Error loading photos: Error fetching data')).toBeInTheDocument();
  });

  // dialog should open on photo click
  it('opens dialog on photo click', () => {
    // Provide mock data for the hook
    useGetPhotos.mockReturnValue({
      data: [{ url: 'dog1.jpg' }],
      isLoading: false,
      error: null
    });

    // Render component
    render(<FlipCardPhoto id="1" />);
    fireEvent.click(screen.getByRole('img'));

    // Check for dialog appearance
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
