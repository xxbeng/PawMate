// Importing icons and components from Material-UI and other libraries
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Box, Button, Typography } from '@mui/material'; // Material-UI components
import PropTypes from 'prop-types'; // Library for type-checking props
import React, { useEffect } from 'react'; // React components and hooks
import { Link, useNavigate } from 'react-router-dom'; // React Router components
import { useAuth } from '../../context/AuthContext'; // Custom context for authentication
import petImage from '../../images/homeDogImage.png'; // Image import
import { APPLICATION_PATH } from '../../utils/urlRoutes'; // Custom application routes
import { CommonStyles } from '../common/CommonStyles'; // Common styles for components

// Functional component for the home page
const HomePage = () => {
  const { isAuthenticated } = useAuth(); // Accessing authentication state
  const navigate = useNavigate(); // Hook for navigation within React Router

  // Effect to redirect authenticated users to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(APPLICATION_PATH.dashboard); // Redirect to dashboard if authenticated
    }
  }, [isAuthenticated, navigate]);

  // Rendering the home page layout
  return (
    <Box sx={{ height: '100vh' }} style={CommonStyles.homeContainerStyles}>
      <Box sx={{ height: '85.7vh' }}>
        <Box sx={{ ...CommonStyles.homeBoxStyles }}>
          <Typography variant="h1" sx={CommonStyles.homeTypographyStyles}>
            Paw Mate
          </Typography>
          <Typography variant="subtitle1" sx={CommonStyles.homeSubtitleStyles}>
            Find your pet&apos;s <strong>perfect playdate</strong>.<br />
            Discover personalized playdates for your pet&apos;s size, energy, and personality.
          </Typography>

          {/* Buttons for login and signup with custom ButtonLink component */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <ButtonLink to="/login" color="primary" icon={<VpnKeyIcon />}>
              Log in
            </ButtonLink>
            <ButtonLink to="/signup" color="success" icon={<PersonAddIcon />}>
              Sign Up
            </ButtonLink>
          </Box>
        </Box>

        {/* Image section at the bottom of the page */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            transform: 'translateX(-50%)',
            zIndex: 1
          }}
        >
          <img
            src={petImage}
            alt="PawMate logo"
            style={{ width: '100%', height: 'auto', marginLeft: '30%' }}
          />
        </Box>
      </Box>

      {/* White space at the bottom of the page */}
      <Box sx={{ height: '14.3vh', backgroundColor: 'white', width: '100%' }} />
    </Box>
  );
};

// Custom component ButtonLink to render links with buttons
const ButtonLink = ({ to, color, icon, children }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    {/* Button component with link destination and color */}
    <Button variant="contained" startIcon={icon} color={color} sx={CommonStyles.homeButtonStyles}>
      {children}
    </Button>
  </Link>
);

// Type-checking for ButtonLink component props
ButtonLink.propTypes = {
  to: PropTypes.string.isRequired, // Required link destination
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning'])
    .isRequired, // Required button color
  icon: PropTypes.element, // Optional icon element
  children: PropTypes.node.isRequired // Required child content (button text)
};

// Exporting the HomePage component as default
export default HomePage;
