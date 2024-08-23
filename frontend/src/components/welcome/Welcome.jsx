// Welcome component for the home page
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import SearchIcon from '@mui/icons-material/Search';
// Import necessary icons and components from Material-UI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card
} from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system'; // Import media query and theme hooks
import React from 'react'; // Import React library
import backgroundImage from '../../images/homeDogImage.png'; // Import background image

import DogWalkingPlaces from '../utils/DogWalkingPlaces'; // Import DogWalkingPlaces component
import Weather from '../utils/Weather'; // Import Weather component

// Welcome component
const Welcome = () => {
  const theme = useTheme(); // Access theme object from Material-UI
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if device is mobile

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '650px 500px', // Set background image size
        position: 'relative' // Set position to relative
      }}
    >
      <Box
        sx={{
          minHeight: '30vh', // Set minimum height for the container
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 10px',
          textAlign: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.6)' // Set background color with transparency
        }}
      >
        {/* Grid container for layout */}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1}></Grid> {/* Empty grid item for spacing */}
          {/* Grid item for weather and dog walking places */}
          <Grid item xs={12} sm={3}>
            {/* Conditionally render accordion components based on mobile view */}
            {isMobile ? (
              <>
                {/* Accordion for weather */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Weather</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Weather />
                  </AccordionDetails>
                </Accordion>
                {/* Accordion for dog walking places */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Dog Walking Places</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DogWalkingPlaces />
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <Box>
                {/* Display weather component */}
                <Box mt={0}>
                  <Weather />
                </Box>
                {/* Display dog walking places component */}
                <Box mt={2}>
                  <DogWalkingPlaces />
                </Box>
              </Box>
            )}
          </Grid>
          {/* Grid item for welcome card */}
          <Grid item xs={12} sm={7}>
            {/* Card component for welcome content */}
            <Card
              sx={{
                width: { xs: '86%', sm: '95%' }, // Set card width based on screen size
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set card background color with transparency
                backdropFilter: 'blur(1px)', // Apply backdrop filter to card
                padding: '20px', // Set padding for card
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Apply box shadow to card
                borderRadius: '10px', // Set border radius for card
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '94%' // Set card height
              }}
            >
              {/* Welcome title */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)' // Apply text shadow to title
                }}
              >
                Welcome to Paw Mate!
              </Typography>
              {/* Welcome message */}
              <Typography
                variant="body1"
                sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center' }}
              >
                {/* Description of Paw Mate */}
                Paw Mate is your go-to platform for finding the perfect playdate for your pet.
                Whether you have a dog, cat, or any furry friend, Paw Mate helps you discover
                personalized playdates based on your pet&apos;s size, energy level, and personality.
              </Typography>
              {/* Key features title */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  mt: 5,
                  mb: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)' // Apply text shadow to key features title
                }}
              >
                Key Features:
              </Typography>
              {/* List of key features */}
              <List sx={{ bgcolor: 'transparent', fontSize: '18px' }}>
                {/* List item for My Pets feature */}
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon /> {/* Icon for My Pets feature */}
                  </ListItemIcon>
                  <ListItemText
                    primary="MY PETS"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                    secondary="Access all your pets' information, where you can add, edit, review, or delete their details."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                  />
                </ListItem>
                {/* List item for Friends feature */}
                <ListItem>
                  <ListItemIcon>
                    <PeopleIcon /> {/* Icon for Friends feature */}
                  </ListItemIcon>
                  <ListItemText
                    primary="FRIENDS"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                    secondary="View your friend list, see who has matched with you, and explore potential playdates for your pets."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                  />
                </ListItem>
                {/* List item for Matching feature */}
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon /> {/* Icon for Matching feature */}
                  </ListItemIcon>
                  <ListItemText
                    primary="MATCHING"
                    primaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                    secondary="Engage in matching with other users' dogs to find compatible playmates for your furry companions."
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'darkslategray' }}
                  />
                </ListItem>
              </List>
              {/* Additional welcome message */}
              <Typography
                variant="body1"
                sx={{ fontSize: '18px', lineHeight: 1.5, mt: 2, textAlign: 'center' }}
              >
                {/* Final message encouraging connection */}
                Start connecting with fellow pet owners and make your pet&apos;s social life more
                fun and exciting with Paw Mate!
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Export Welcome component
export default Welcome;
