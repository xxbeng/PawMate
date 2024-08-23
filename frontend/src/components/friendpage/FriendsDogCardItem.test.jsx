/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FriendsDogCardItem from './FriendsDogCardItem';
import { MemoryRouter } from 'react-router-dom'; // Needed to test components that use the router

// Mock for useNavigate hook from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

// Test suite for FriendsDogCardItem component
describe('FriendsDogCardItem', () => {
  // Dummy props for the component
  const dummyProps = {
    id: 'dog123',
    image: 'dog-image.jpg',
    name: 'Buddy',
    gender: 'Male',
    aboutMe: 'Friendly and playful',
    userId: 'user123',
    dogId: 'dog123'
  };

  // Render the component before each test
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FriendsDogCardItem {...dummyProps} />
      </MemoryRouter>
    );
  });

  // Test cases for the component
  it('renders the dog name', () => {
    const dogName = screen.getByText('Buddy');
    expect(dogName).toBeInTheDocument();
  });

  it('renders the gender icon correctly', () => {
    const genderIcon = screen.getByTestId('MaleIcon');
    expect(genderIcon).toBeInTheDocument();
  });

  it('shows the correct alt text for the image', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'dog123');
  });

  it('navigates to the correct profile page when the view profile chip is clicked', () => {
    const viewProfileButton = screen.getByText('View Profile');
    fireEvent.click(viewProfileButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/dog/user123/dog123');
  });
});
