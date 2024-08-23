// FriendPage component to display a friend's profile page
import CloseIcon from '@mui/icons-material/Close'; // Close icon from Material-UI
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded'; // Diversity icon from Material-UI
import { Box, Typography, Grid, CircularProgress, IconButton } from '@mui/material'; // Material-UI components
import React, { useState, useEffect } from 'react'; // React components and hooks
import { useParams } from 'react-router-dom'; // React Router components
import axiosApiInstance from '../../utils/axiosApiInstance'; // Axios instance for API requests
import FriendList from '../matchapage/FriendList'; // FriendList component
import FriendsDogCardItem from './FriendsDogCardItem'; // Custom FriendsDogCardItem component

// Component for displaying a friend's profile page
const FriendPage = () => {
  const { friendId } = useParams(); // Retrieve friend ID from URL params
  const [selectedFriend, setSelectedFriend] = useState(null); // State for storing selected friend data
  const [friendDogs, setFriendDogs] = useState([]); // State for storing friend's dogs
  const [loading, setLoading] = useState(true); // State for loading status
  const [showFriendList, setShowFriendList] = useState(false); // State for showing friend list
  const [isIconClose, setIsIconClose] = useState(false); // State for toggle icon

  // Function to toggle friend list visibility
  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
    setIsIconClose(!isIconClose);
  };

  // Effect to fetch friend data and dogs on component mount
  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const friendsResponse = await axiosApiInstance.get('/api/match'); // Fetch all friends
        const friends = friendsResponse.data;

        const friend = friends.find((friend) => friend._id === friendId); // Find specific friend by ID

        if (friend) {
          setSelectedFriend(friend); // Set selected friend data

          const dogsResponse = await axiosApiInstance.get(`/api/dog/user/${friendId}`); // Fetch friend's dogs
          setFriendDogs(dogsResponse.data); // Set friend's dogs data
        } else {
          console.error(`Friend with ID ${friendId} not found.`);
        }
      } catch (error) {
        console.error('Error fetching friend data:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchFriendData(); // Call fetchFriendData function on component mount
  }, [friendId]); // Dependency array to trigger effect on friendId change

  // Render loading spinner while data is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  // Render friend profile and dogs list
  return (
    <Grid container spacing={3} data-testid="friend-page">
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* IconButton to toggle friend list visibility */}
          <IconButton onClick={toggleFriendList} color="secondary">
            {isIconClose ? ( // Conditional rendering based on isIconClose state
              <CloseIcon fontSize="large" />
            ) : (
              <Diversity1RoundedIcon fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Grid>
      {/* Render FriendList component if showFriendList is true */}
      {showFriendList && <FriendList toggleFriendList={toggleFriendList} />}
      <Grid item xs={12}>
        {selectedFriend ? ( // Conditional rendering of friend profile details
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedFriend.username} {/* Display friend's username */}
            </Typography>
            <Box>
              <Typography variant="body1" gutterBottom>
                Email: {selectedFriend.email} {/* Display friend's email */}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: {selectedFriend.phone} {/* Display friend's phone number */}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: {selectedFriend.address} {/* Display friend's address */}
              </Typography>
            </Box>
            {/* Render grid of friend's dogs */}
            <Grid container spacing={2} justifyContent="center">
              {friendDogs.map((dog) => (
                <Grid item key={dog._id} xs={12} sm={6} md={4} lg={3}>
                  {/* Render FriendsDogCardItem for each dog */}
                  <FriendsDogCardItem
                    id={dog._id}
                    image={dog.profilePicture}
                    name={dog.name}
                    gender={dog.gender}
                    aboutMe={dog.bio}
                    userId={friendId}
                    dogId={dog._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1">Loading friend data...</Typography> // Render while loading friend data
        )}
      </Grid>
    </Grid>
  );
};

export default FriendPage; // Export FriendPage component as default
