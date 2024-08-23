//DogCardItem component for displaying each dog card in dashboard
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {
  Chip,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonStyles } from '../../common/CommonStyles';
import DogCreateUpdateDialog from '../DogCreateUpdateDialog';

// Dog card item component for displaying each dog card in dashboard
const DogCardItem = ({ id, image, name, gender, aboutMe }) => {
  const navigate = useNavigate();

  // Handle view click, navigate to dog profile page
  const handleViewClick = () => {
    navigate(`/dog/${id}`);
  };

  return (
    <Card sx={CommonStyles.dogDashboardCard}>
      {/* Card action area for clickable card */}
      <CardActionArea onClick={handleViewClick}>
        {/* Card media for dog image */}
        <CardMedia
          component="img"
          height={300}
          image={`${process.env.REACT_APP_API_URL}/${image}`}
          alt={id}
          sx={{ objectFit: 'cover' }}
        />
        {/* Card content for dog details */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', color: '#2a2a2a' }}
          >
            {name}
          </Typography>
          {gender === 'Male' ? (
            <MaleIcon fontSize="small" style={{ color: '#6699ff' }} />
          ) : (
            <FemaleIcon fontSize="small" style={{ color: '#ff99cc' }} />
          )}
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
      {/* Card actions for buttons */}
      <CardActions sx={CommonStyles.cardActions}>
        {/* Button for view profile */}
        <Chip label="View Profile" onClick={handleViewClick} sx={CommonStyles.chipButton} />
        {/* Button for dog update */}
        <DogCreateUpdateDialog dogId={id} />
      </CardActions>
    </Card>
  );
};

// Define prop types
DogCardItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired
};

export default DogCardItem;
