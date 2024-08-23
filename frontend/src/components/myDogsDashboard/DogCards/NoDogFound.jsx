// NoDogsFound component is displayed when there are no dogs in the database.
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Typography } from '@mui/material';
import React from 'react';

// Displays a message when no dogs are found
const NoDogsFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ py: 4, mt: 2 }}
    >
      <PetsIcon sx={{ fontSize: 100, color: 'lightblue' }} />
      <Typography variant="h5" sx={{ color: 'text.secondary', mt: 2 }} gutterBottom>
        No dogs found
      </Typography>
      <Typography variant="subtitle1">Looks like you haven&apos;t created any dogs yet.</Typography>
    </Box>
  );
};

export default NoDogsFound;
