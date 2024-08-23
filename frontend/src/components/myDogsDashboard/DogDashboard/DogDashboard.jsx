// DogDashboard Component, to display the dog all dog cards and add dialog
import { Box, Typography } from '@mui/material';

import React from 'react';
import DogCards from '../DogCards';
import DogCreateUpdateDialog from '../DogCreateUpdateDialog';

// Dog dashboard for display, creating and updating dogs
export default function DogDashboard() {
  return (
    <Box justifyContent="center" alignItems="center">
      <Box mb={2}>
        <Typography variant="h2">My Dog Dashboard</Typography>
      </Box>
      <DogCreateUpdateDialog />
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <DogCards />
      </Box>
    </Box>
  );
}
