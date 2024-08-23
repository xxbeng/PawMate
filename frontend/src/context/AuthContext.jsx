// AuthContext component for the application, which provides the authentication state and functions to the application
import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import { tokenStorage, userDataStorage } from '../utils/localStorageNames';
import { useLoginMutation, useSignupMutation } from './AuthContext.queries';

// Create a context for the authentication state and functions
export const AuthContext = createContext();

// AuthProvider component to provide authentication state and functions to the application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenStorage.get()); // Check if the user is authenticated
  const [isSignup, setIsSignup] = useState(false); // Check if the user is signing up
  // Get the current user from the local storage
  const [currentUser, setUser] = useState(() => {
    if (userDataStorage.get()) {
      return userDataStorage.get();
    }
  });

  // Login, signup and logout functions
  const {
    mutate: login,
    error: loginErrors,
    isPending: isPendingLogin
  } = useLoginMutation(({ data: { user, token } }) => {
    tokenStorage.save(token);
    userDataStorage.save(user);
    setUser(user);
    setIsAuthenticated(true);
  });

  // Signup mutation
  const {
    mutate: signup,
    error: signupErrors,
    isPending: isPendingSignup
  } = useSignupMutation(() => {
    setIsSignup(true);
  });

  // Logout function
  const logout = () => {
    tokenStorage.remove();
    userDataStorage.remove();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPendingLogin,
        setIsAuthenticated,
        login,
        loginErrors,
        logout,
        signup,
        signupErrors,
        isSignup,
        isPendingSignup,
        setIsSignup,
        currentUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAuth() {
  return useContext(AuthContext);
}
