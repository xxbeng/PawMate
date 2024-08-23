// Main entry point for the frontend application
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import FriendDogProfile from './components/friendpage/FriendDogProfile';
import FriendPage from './components/friendpage/FriendPage';
import Friends from './components/friendpage/Friends';
import HomePage from './components/homepage/HomePage';
import Header from './components/layout/Header';
import FriendList from './components/matchapage/FriendList';
import MatchPage from './components/matchapage/MatchPage';
import DogDashboard from './components/myDogsDashboard/DogDashboard';
import DogProfile from './components/myDogsDashboard/DogProfile/DogProfile';
import UserProfile from './components/UserProfile/UserProfile';
import Welcome from './components/welcome/Welcome';

import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import theme from './theme';

import { APPLICATION_PATH } from './utils/urlRoutes';

// Create a new instance of the React Query client
const queryClient = new QueryClient();

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <Header />
      <Box sx={{ p: 3 }}>{children}</Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

// Prop types for the PrivateRoute component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

// Main App component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <AuthProvider>
            <Router>
              <Routes>
                <Route path={APPLICATION_PATH.auth.login} element={<Login />} />
                <Route path={APPLICATION_PATH.auth.signup} element={<SignUp />} />
                <Route path={APPLICATION_PATH.friendList} element={<FriendList />} />
                <Route
                  path={APPLICATION_PATH.matching}
                  element={
                    <PrivateRoute>
                      <MatchPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.user.friends}
                  element={
                    <PrivateRoute>
                      <Friends />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.friends.dogs}
                  element={
                    <PrivateRoute>
                      <FriendPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.friends.dog}
                  element={
                    <PrivateRoute>
                      <FriendDogProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.dashboard}
                  element={
                    <PrivateRoute>
                      <Welcome />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.dog.dashboard}
                  element={
                    <PrivateRoute>
                      <DogDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.dog.profile}
                  element={
                    <PrivateRoute>
                      <DogProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={APPLICATION_PATH.user.profile}
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route path={APPLICATION_PATH.homepage} element={<HomePage />} />
              </Routes>
            </Router>
          </AuthProvider>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
