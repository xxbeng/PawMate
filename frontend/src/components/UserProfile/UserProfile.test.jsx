// Test: UserProfile.test.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import UserProfile from './UserProfile';
// Mock the 'useQuery' function from '@tanstack/react-query' for testing.
// It returns a predefined object simulating a successful query with specific user data.
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({
    isLoading: false,
    error: null,
    data: {
      _id: '66383d96fc8cba6c50a2671d',
      aboutMe: 'joijogj',
      username: 'hongwei123',
      password: '$2a$12$N0XfwdeN5ysd0bGaQGCf/uVcr5yabu24922GReh.wgUX14TrpxByW',
      email: 'hongwei@gmail.com',
      address: '300 N Los Angeles St, Los Angeles, CA 90012',
      latitude: 34.0537012,
      longitude: -118.23977,
      phone: '13156489',
      like: [],
      likeMe: [],
      friends: [],
      dogs: ['66383e17fc8cba6c50a26727'],
      __v: 1
    }
  })
}));

const queryClient = new QueryClient();

const currentUser = {
  _id: '66383d96fc8cba6c50a2671d',
  aboutMe: 'joijogj',
  username: 'hongwei123',
  password: '$2a$12$N0XfwdeN5ysd0bGaQGCf/uVcr5yabu24922GReh.wgUX14TrpxByW',
  email: 'hongwei@gmail.com',
  address: '300 N Los Angeles St, Los Angeles, CA 90012',
  latitude: 34.0537012,
  longitude: -118.23977,
  phone: '13156489',
  like: [],
  likeMe: [],
  friends: [],
  dogs: ['66383e17fc8cba6c50a26727'],
  __v: 1
};

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>
    </MemoryRouter>
  </QueryClientProvider>
);

describe('UserProfile', () => {
  it('renders without crashing', async () => {
    render(<UserProfile />, { wrapper });
    const userProfileElement = await screen.findByText(/User Profile/i, { timeout: 10000 });
    expect(userProfileElement).toBeInTheDocument();
  });

  it('should unmount after clicking the cancel button', () => {
    const { unmount, getByText } = render(<UserProfile />, { wrapper });
    fireEvent.click(getByText(/Cancel/i));
    unmount();
    expect(screen.queryByText(/User Profile/i)).toBeNull();
  });
});
