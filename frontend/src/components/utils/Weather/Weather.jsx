// Weather component to display the weather in Auckland
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud'; // Import icons relevant to the weather
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WaterIcon from '@mui/icons-material/Water';
import { Box, Typography, Paper, Grid, Divider, CircularProgress } from '@mui/material';

import React, { useEffect, useState } from 'react';

import { useGetWeather } from '../../../queries/thridParties';

// Weather component to display the weather in Auckland, powered by OpenWeatherMap.org
const Weather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null }); // State for storing user's location
  const [geoLocalizationError, setGeoLocalizationError] = useState(false); // State for geolocation error

  // Get weather data for the user's location
  const { data: weatherData } = useGetWeather(
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
  if (!weatherData && !geoLocalizationError) return <CircularProgress />;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 400,
        margin: 'auto',
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
        Weather in Auckland
      </Typography>
      <Typography
        variant="caption"
        align="center"
        sx={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        Powered by OpenWeatherMap.org
      </Typography>
      <Divider sx={{ my: 1 }} />
      {geoLocalizationError ? (
        <Typography>Please enable location services to get the weather data.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <ThermostatIcon color="primary" sx={{ mr: 1 }} />
                <Typography>Temp: {weatherData.main.temp}°C</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <WaterIcon color="primary" sx={{ mr: 1 }} />
                <Typography>Humidity: {weatherData.main.humidity}%</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <AirIcon color="primary" sx={{ mr: 1 }} />
                <Typography>Wind: {weatherData.wind.speed} m/s</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <CloudIcon color="primary" sx={{ mr: 1 }} />
                <Typography>{weatherData.weather[0].description}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="caption"
            align="center"
            color={weatherData.isGoodDayForWalk ? 'green' : 'red'}
          >
            {weatherData.isGoodDayForWalk ? (
              <Box color="green" display="flex" alignItems="center" justifyContent="center">
                <ThumbUpIcon sx={{ mr: 1 }} />
                Good day for walking your dog!
              </Box>
            ) : (
              <Box color="red" display="flex" alignItems="center" justifyContent="center">
                <ThumbDownIcon sx={{ mr: 1 }} />
                Not a good day for walking your dog.
              </Box>
            )}
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default Weather;
