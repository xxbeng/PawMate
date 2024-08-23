// FriendsDogCardItem component is a child component used in FriendsDogList component
import FemaleIcon from '@mui/icons-material/Female'; // Female icon from Material-UI
import MaleIcon from '@mui/icons-material/Male'; // Male icon from Material-UI
import {
  Chip,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'; // Material-UI components

import PropTypes from 'prop-types'; // PropTypes for type-checking
import React from 'react'; // React library
import { useNavigate } from 'react-router-dom'; // React Router hook
import { CommonStyles } from '../common/CommonStyles'; // Common styles for components

// Component for displaying a friend's dog card item
const FriendsDogCardItem = ({ id, image, name, gender, aboutMe, userId, dogId }) => {
  const navigate = useNavigate(); // React Router navigation hook

  // Event handler for navigating to dog profile
  const handleViewClick = () => {
    const dogProfileUrl = `/dog/${userId}/${dogId}`; // Construct dog profile URL
    navigate(dogProfileUrl); // Navigate to dog profile page
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {/* Card component for displaying dog information */}
      <Card sx={CommonStyles.dogDashboardCard}>
        {/* Clickable area for card action */}
        <CardActionArea onClick={handleViewClick}>
          {/* Dog image */}
          <CardMedia
            component="img"
            height={300}
            image={`${process.env.REACT_APP_API_URL}/${image}`} // Dog image URL
            alt={id} // Alt text for image
            sx={{ objectFit: 'cover' }} // Styling for image
          />
          {/* Card content section */}
          <CardContent>
            {/* Dog name */}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 'bold', color: '#2a2a2a' }} // Styling for dog name
            >
              {name}
            </Typography>
            {/* Gender icon (Male or Female) */}
            {gender === 'Male' ? (
              <MaleIcon fontSize="small" style={{ color: '#6699ff' }} />
            ) : (
              <FemaleIcon fontSize="small" style={{ color: '#ff99cc' }} />
            )}
            {/* Dog description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {aboutMe}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* Card actions section */}
        <CardActions sx={CommonStyles.cardActions}>
          {/* Chip button for viewing dog profile */}
          <Chip label="View Profile" onClick={handleViewClick} sx={CommonStyles.chipButton} />
        </CardActions>
      </Card>
    </Grid>
  );
};

// PropTypes for type-checking of component props
FriendsDogCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  dogId: PropTypes.string.isRequired
};

export default FriendsDogCardItem; // Export FriendsDogCardItem component as default
