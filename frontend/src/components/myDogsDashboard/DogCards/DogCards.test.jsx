// Test: DogCards Component
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useGetDogs } from '../../../queries/dogs';
import DogCards from './DogCards';

// Mock the custom hook useGetDogs
jest.mock('../../../queries/dogs', () => ({
  useGetDogs: jest.fn()
}));

// Mock components
jest.mock('../DogCardItem', () => {
  const DogCardItem = () => <div>DogCardItem</div>;
  DogCardItem.displayName = 'DogCardItem';
  return DogCardItem;
});

// Mock components
jest.mock('./NoDogFound', () => {
  const NoDogFound = () => <div>NoDogsFound</div>;
  NoDogFound.displayName = 'NoDogFound';
  return NoDogFound;
});

// Test the DogCards component, which displays a list of dogs
describe('DogCards', () => {
  it('displays loading state correctly', () => {
    useGetDogs.mockReturnValue({ isLoading: true, error: null, data: null });
    render(<DogCards />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    useGetDogs.mockReturnValue({ isLoading: false, error: 'Error loading dogs.', data: null });
    render(<DogCards />);
    expect(screen.getByText('Error loading dogs.')).toBeInTheDocument();
  });

  it('displays no dogs found when there are no dogs', () => {
    useGetDogs.mockReturnValue({ isLoading: false, error: null, data: [] });
    render(<DogCards />);
    expect(screen.getByText('NoDogsFound')).toBeInTheDocument();
  });

  it('renders DogCardItem when dogs are available', () => {
    useGetDogs.mockReturnValue({
      isLoading: false,
      error: null,
      data: [{ _id: '1', name: 'Buddy', gender: 'Male', profilePicture: 'url', bio: 'Friendly' }]
    });
    render(<DogCards />);
    expect(screen.getByText('DogCardItem')).toBeInTheDocument();
  });
});
