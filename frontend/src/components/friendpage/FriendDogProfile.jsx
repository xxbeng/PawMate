// Friends' dog profile component, displaying dog details
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Icon for displaying events
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Icon for favorites
import FemaleIcon from '@mui/icons-material/Female'; // Female gender icon
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Icon for fitness-related information
import MaleIcon from '@mui/icons-material/Male'; // Male gender icon
import PetsIcon from '@mui/icons-material/Pets'; // Icon for displaying pet type
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid
} from '@mui/material'; // Material-UI components
import React, { useEffect, useState } from 'react'; // React components and hooks
import { useParams, useNavigate } from 'react-router-dom'; // React Router components
import axiosApiInstance from '../../utils/axiosApiInstance'; // Axios instance for API requests
import FlipCardPhoto from '../matchapage/FlipCardPhoto'; // Custom FlipCardPhoto component

// Component for displaying a friend's dog profile
const FriendDogProfile = () => {
  const { userId, dogId } = useParams(); // Retrieve user and dog IDs from URL params
  const [dog, setDog] = useState(null); // State for storing dog data
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate(); // Hook for navigation within React Router

  // Function to get neutered status in readable format
  const getNeuteredStatus = (neutered) => {
    return neutered ? 'Yes' : 'No';
  };

  // Function to calculate age based on date of birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const monthsDiff =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    if (years === 0) {
      return `${months} months`;
    } else {
      return `${years} years ${months} months`;
    }
  };

  // Effect to fetch dog data from the API
  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const response = await axiosApiInstance.get(`/api/dog/${userId}/${dogId}`); // Fetch dog data
        setDog(response.data); // Set dog data in state
      } catch (error) {
        console.error('Error fetching dog data:', error); // Log error if fetching fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchDogData(); // Call fetchDogData function
  }, [userId, dogId]); // Dependency array to trigger effect on ID changes

  // Render loading spinner while data is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  // Render message if dog data is not found
  if (!dog) {
    return <Typography variant="body1">Dog data not found.</Typography>;
  }

  // Render dog profile card and details
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            maxWidth: 630,
            width: '100%',
            backgroundColor: '#fafcfd',
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image={`${process.env.REACT_APP_API_URL}/${dog.profilePicture}`} // Dog profile picture URL
            alt={dog.name}
          />
          <CardContent>
            <Typography variant="h2" gutterBottom>
              {dog.name}
              {dog.gender === 'Male' ? (
                <MaleIcon
                  fontSize="small"
                  sx={{ verticalAlign: 'middle', ml: 1 }}
                  style={{ color: '#6699ff' }} // Blue color for male icon
                />
              ) : (
                <FemaleIcon
                  fontSize="small"
                  sx={{ verticalAlign: 'middle', ml: 1 }}
                  style={{ color: '#ff99cc' }} // Pink color for female icon
                />
              )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <PetsIcon />
              {dog.breed} {/* Display dog breed with PetsIcon */}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EmojiEventsIcon />
              Age: {calculateAge(dog.dob)} {/* Display dog age with EmojiEventsIcon */}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <FitnessCenterIcon />
              Weight: {dog.weight} kg {/* Display dog weight with FitnessCenterIcon */}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <FavoriteBorderIcon />
              Neutered: {getNeuteredStatus(dog.neutered)}
              {/* Display neutered status with FavoriteBorderIcon */}
            </Typography>
            <Typography variant="body1" gutterBottom>
              About Me: {dog.bio} {/* Display dog bio */}
            </Typography>
            <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 2 }}>
              Back to Previous Page
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <FlipCardPhoto id={dogId} sx={{ height: '100px' }} /> {/* Render FlipCardPhoto component */}
      </Grid>
    </Grid>
  );
};

export default FriendDogProfile; // Export FriendDogProfile component as default
