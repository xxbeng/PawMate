// DogWalingPlaces component to show the best places to walk your dog near you.
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetPlacesToWalkMyDog } from '../../../queries/thridParties';

// DogWalkingPlaces component to show the best places to walk your dog near you
const DogWalkingPlaces = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [geoLocalizationError, setGeoLocalizationError] = useState(false);

  const { data: placesData } = useGetPlacesToWalkMyDog(
    {
      lat: location.latitude,
      lon: location.longitude
    },
    {
      enabled: (location.latitude && location.longitude) !== null
    }
  );

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        setGeoLocalizationError(true);
      }
    );
  }, []);

  // Render loading spinner while data is being fetched
  if (!placesData && !geoLocalizationError) return <CircularProgress />;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 400,
        margin: 'auto',
        height: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          mb: 1,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Near Dog Walking Places
      </Typography>
      <Typography
        variant="caption"
        align="center"
        sx={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Powered by ChatGPT
      </Typography>
      <Divider sx={{ my: 1 }} />
      {geoLocalizationError ? (
        <Typography>
          Please enable location services to get the best places to walk your dog.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {placesData.answer &&
            placesData.answer.map(
              ({ name, distancesByWalk, timeByWalk, distancesByCar, timeByCar }) => (
                <Box key={name} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="h6">{name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsWalkIcon color="primary" />
                    <Typography variant="body2">{`Walk: ${distancesByWalk} km, ${timeByWalk} mins`}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCarIcon color="secondary" />
                    <Typography variant="body2">{`Car: ${distancesByCar} km, ${timeByCar} mins`}</Typography>
                  </Box>
                </Box>
              )
            )}
          <Divider />
        </Box>
      )}
    </Paper>
  );
};

export default DogWalkingPlaces;
