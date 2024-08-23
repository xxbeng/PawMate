// Test: DogProfile Component
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DogProfile from './DogProfile';

jest.mock('../../../queries/dogs', () => ({
  useGetDog: jest.fn(),
  useDeleteDogMutation: jest.fn()
}));

// Mock any child components that use React Query or other hooks
jest.mock('../DogCreateUpdateDialog', () => {
  const DogCreateUpdateDialog = () => <div>Dog Create Update Dialog</div>;
  return DogCreateUpdateDialog;
});

jest.mock('../DogPhotoGallery/DogPhotoGallery', () => {
  const DogPhotoGallery = () => <div>Dog Photo Gallery</div>;
  return DogPhotoGallery;
});

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={['/dogs/1']}>
      <Routes>
        <Route path="/dogs/:id" element={children} />
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>
);

describe('DogProfile', () => {
  beforeEach(() => {
    const { useGetDog, useDeleteDogMutation } = require('../../../queries/dogs');
    useGetDog.mockReturnValue({
      data: {
        _id: '1',
        name: 'Buddy',
        breed: 'Golden Retriever',
        dob: '2019-05-01',
        neutered: true,
        weight: 30,
        profilePicture: 'dog.jpg',
        bio: 'Loves playing fetch.',
        gender: 'Male'
      },
      isLoading: false,
      isError: false
    });
    useDeleteDogMutation.mockReturnValue({
      mutate: jest.fn()
    });
  });

  it('renders dog profile information correctly', () => {
    render(<DogProfile />, { wrapper: Wrapper });
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Golden Retriever')).toBeInTheDocument();
    expect(screen.getByText('Neutered: Yes')).toBeInTheDocument();
    expect(screen.getByText('Loves playing fetch.')).toBeInTheDocument();
  });

  it('renders dog profile picture', () => {
    render(<DogProfile />, { wrapper: Wrapper });
    expect(screen.getByAltText('Buddy')).toBeInTheDocument();
  });

  it('renders dog photo gallery', () => {
    render(<DogProfile />, { wrapper: Wrapper });
    expect(screen.getByText('Dog Photo Gallery')).toBeInTheDocument();
  });

  it('renders a button to delete the dog', () => {
    render(<DogProfile />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('renders DogCreateUpdateDialog component', () => {
    render(<DogProfile />, { wrapper: Wrapper });
    expect(screen.getByText('Dog Create Update Dialog')).toBeInTheDocument();
  });
});
