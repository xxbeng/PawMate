/* eslint-disable */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FriendDogProfile from './FriendDogProfile';
import axiosApiInstance from '../../utils/axiosApiInstance';

// mock axiosApiInstance
jest.mock('../../utils/axiosApiInstance');

// mock dog data
const mockDogData = {
  name: 'Buddy',
  gender: 'Male',
  breed: 'Golden Retriever',
  dob: '2020-04-15',
  weight: 30,
  neutered: true,
  bio: 'Friendly and energetic',
  profilePicture: 'buddy.jpg'
};

// test suite for FriendDogProfile component
describe('FriendDogProfile', () => {
  // test case for rendering dog data
  it('shows loading spinner before data is loaded', () => {
    axiosApiInstance.get.mockResolvedValueOnce({ data: mockDogData });
    render(
      <BrowserRouter>
        <FriendDogProfile />
      </BrowserRouter>
    );
    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();
  });

  // test case for loading dog data
  it('displays an error message if the dog data is not found', async () => {
    axiosApiInstance.get.mockRejectedValueOnce(new Error('Error fetching dog data'));
    render(
      <BrowserRouter>
        <FriendDogProfile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Dog data not found.')).toBeInTheDocument();
    });
  });
});
