// LoadingWrapper component
import PropTypes from 'prop-types';
import React from 'react';

// LoadingWrapper component to display a loading message while data is being fetched
export const LoadingWrapper = ({ isLoading, children, customMessage = undefined }) => {
  if (isLoading) {
    return <div>{customMessage || 'Loading...'}</div>;
  }

  return <>{children}</>;
};

// Prop types for the LoadingWrapper component
LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  customMessage: PropTypes.string
};
