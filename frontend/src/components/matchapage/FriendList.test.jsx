// Test: FriendList Component
/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FriendList from './FriendList';
import { BrowserRouter as Router } from 'react-router-dom';
import * as AuthContext from '../../context/AuthContext';
import * as DogsQueries from '../../queries/dogs';
import * as FriendsQueries from '../../queries/friends';
import * as UserQueries from '../../queries/user';

// Mock the necessary hooks and components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn() // Mocking the useNavigate hook
}));

// Mocking modules
jest.mock('../../context/AuthContext');
jest.mock('../../queries/dogs');
jest.mock('../../queries/friends');
jest.mock('../../queries/user');

describe('FriendList Component', () => {
  beforeEach(() => {
    // Set up default implementations for mocked hooks and queries
    AuthContext.useAuth.mockReturnValue({
      currentUser: { username: 'currentuser' }
    });
    UserQueries.useGetUser.mockReturnValue({
      data: { _id: '1', username: 'currentuser', aboutMe: 'Hello there!' },
      isLoading: false
    });
    DogsQueries.useGetDogs.mockReturnValue({
      data: [{ id: 1, profilePicture: 'dog1.jpg' }],
      isLoading: false
    });
    FriendsQueries.useGetFriends.mockReturnValue({
      data: [{ _id: '2', username: 'friend1', aboutMe: 'Friend bio' }],
      isLoading: false,
      isError: false
    });
    FriendsQueries.useUnfriendMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false
    });
  });
  // Rendering the FriendList component
  it('renders the FriendList component', () => {
    render(<FriendList />, { wrapper: Router });
    expect(screen.getByTestId('friend-list')).toBeInTheDocument();
  });

  // Rendering error state when there is an error fetching friends
  it('renders error state when there is an error fetching friends', () => {
    FriendsQueries.useGetFriends.mockReturnValueOnce({ isError: true });
    render(<FriendList />, { wrapper: Router });
    expect(screen.getByText('Error loading friends.')).toBeInTheDocument();
  });

  // Handling friend item clicks correctly
  it('handles friend item clicks correctly', () => {
    const navigate = jest.fn();
    render(<FriendList />, { wrapper: Router });
    const friendItem = screen.getByText('friend1');
    fireEvent.click(friendItem);
  });
});
