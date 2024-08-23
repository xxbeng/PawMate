// Quary loading wrapper component
import { useIsFetching } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React from 'react';

// QueryLoadingWrapper component to display a loading message while data is being fetched
export const QueryLoadingWrapper = ({ children }) => {
  const isFetching = useIsFetching();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

QueryLoadingWrapper.propTypes = {
  children: PropTypes.node
};

// // Usage
// const MyComponentWithLoading = () => (
//   <QueryLoadingWrapper>
//     <MyComponent />
//   </QueryLoadingWrapper>
// );
