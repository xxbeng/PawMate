// Test: DogPhotoGallery Component
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  useGetPhotos,
  useCreatePhotoMutation,
  useDeletePhotoMutation
} from '../../../queries/photos';
import DogPhotoGallery from './DogPhotoGallery';
import '@testing-library/jest-dom';

// Mock the external hooks and their return values
jest.mock('../../../queries/photos', () => ({
  useGetPhotos: jest.fn(() => ({
    data: mockPhotos,
    isLoading: true,
    refetch: jest.fn()
  })),
  useCreatePhotoMutation: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useDeletePhotoMutation: jest.fn(() => ({
    mutate: jest.fn()
  }))
}));

// Mock the photos data
const mockPhotos = [
  { _id: '1', url: 'photo1.jpg' },
  { _id: '2', url: 'photo2.jpg' }
];

// Test suite for the DogPhotoGallery component
describe('DogPhotoGallery', () => {
  beforeEach(() => {
    // Set up default returns for hooks
    useGetPhotos.mockReturnValue({
      data: mockPhotos,
      isLoading: false,
      refetch: jest.fn()
    });
    useCreatePhotoMutation.mockReturnValue({
      mutate: jest.fn()
    });
    useDeletePhotoMutation.mockReturnValue({
      mutate: jest.fn()
    });
  });

  it('renders without crashing', () => {
    render(<DogPhotoGallery id="123" />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });

  it('displays the correct number of photos', () => {
    render(<DogPhotoGallery id="123" />);
    const photoItems = screen.getAllByRole('img');
    expect(photoItems.length).toBe(mockPhotos.length);
  });

  it('checks if the delete button exists for each photo', () => {
    render(<DogPhotoGallery id="123" />);
    const deletePhotoButtons = screen.queryAllByRole('button', { name: 'Delete' });
    expect(deletePhotoButtons.length).toBe(mockPhotos.length);
  });
});
