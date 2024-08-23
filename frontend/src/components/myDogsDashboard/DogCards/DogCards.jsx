// DogCards component is used in DogDashboard component. DogCards component is to display all the dog cards in the dashboard.
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useGetDogs } from '../../../queries/dogs';
import DogCardItem from '../DogCardItem';
import NoDogsFound from './NoDogFound';

// Dog cards component for displaying all dog cards in dashboard
const DogCards = () => {
  const { data: dogs, error, isLoading } = useGetDogs();

  if (isLoading) return <Typography>Loading...</Typography>; // Loading state
  if (error) return <Typography>Error loading dogs.</Typography>; // Error state

  // If no dogs found, display NoDogsFound component
  if (!dogs || dogs.length === 0) {
    return <NoDogsFound />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={1}>
        {dogs.map(({ _id, name, gender, profilePicture, bio }) => (
          <Grid item key={_id} xs style={{ display: 'flex', justifyContent: 'center' }}>
            <DogCardItem
              id={_id}
              image={profilePicture}
              name={name}
              gender={gender}
              aboutMe={bio}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DogCards;
