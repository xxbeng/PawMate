/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FriendPage from './FriendPage';
import axiosApiInstance from '../../utils/axiosApiInstance';

// mock axiosApiInstance
jest.mock('../../utils/axiosApiInstance');

// mock dataset
const mockFriend = {
  _id: '123',
  username: 'JohnDoe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  address: '123 Main St'
};

const mockDogs = [
  {
    _id: 'dog1',
    profilePicture: 'dog1.jpg',
    name: 'Rex',
    gender: 'Male',
    bio: 'Friendly and loyal'
  },
  {
    _id: 'dog2',
    profilePicture: 'dog2.jpg',
    name: 'Bella',
    gender: 'Female',
    bio: 'Loves to play fetch'
  }
];

// Test suite for FriendPage component
describe('FriendPage', () => {
  // test case for rendering friend data
  it('renders FriendPage component with testid "friend-page"', async () => {
    render(
      <BrowserRouter>
        <FriendPage />
      </BrowserRouter>
    );

    const friendPageElement = await screen.findByTestId('friend-page');
    expect(friendPageElement).toBeInTheDocument();
  });

  // test case for loading friend data
  it('handles API errors gracefully', async () => {
    axiosApiInstance.get.mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <FriendPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading friend data...')).toBeInTheDocument();
    });
  });
});
