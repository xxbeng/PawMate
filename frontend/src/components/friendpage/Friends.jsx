// Friends component for displaying user's friends and managing friend interactions
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'; // Delete icon from Material-UI
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Popover,
  Button,
  Grid
} from '@mui/material'; // Material-UI components
import React, { useState, useEffect } from 'react'; // React components and hooks
import { useNavigate } from 'react-router-dom'; // React Router components
import { useAuth } from '../../context/AuthContext'; // Custom authentication context
import { useGetDogs } from '../../queries/dogs'; // Custom hook for fetching dogs data
import { useGetFriends, useUnfriendMutation } from '../../queries/friends'; // Custom hooks for fetching friends data and unfriending
import { useGetUser } from '../../queries/user'; // Custom hook for fetching user data

// Component for displaying user's friends and managing friend interactions
const Friends = () => {
  const { currentUser } = useAuth(); // Retrieve current user from authentication context
  const { data: currentUserData, isLoading: isLoadingUser } = useGetUser(currentUser?.username); // Fetch current user data
  const { data: dogs, isLoading: isLoadingDogs } = useGetDogs(); // Fetch dogs data
  const { data: friendsData, isLoading: isLoadingFriends, isError } = useGetFriends(); // Fetch friends data
  const { mutate: unfriend, isLoading: isLoadingUnfriend } = useUnfriendMutation(); // Mutation hook for unfriending
  const [friends, setFriends] = useState([]); // State for storing friends list
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [anchorEl, setAnchorEl] = useState(null); // State for anchor element of popover
  const [selectedFriend, setSelectedFriend] = useState(null); // State for selected friend
  const navigate = useNavigate(); // Hook for navigation within React Router

  // Effect to update friends list and sort alphabetically
  useEffect(() => {
    if (!isLoadingDogs && dogs && dogs.length === 0) {
      console.error('No dogs available');
    }
    if (friendsData) {
      const sortedFriends = [...friendsData].sort((a, b) => a.username.localeCompare(b.username));
      setFriends(sortedFriends);
    }
  }, [isLoadingDogs, dogs, friendsData]);

  // Event handler for search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Event handler for clicking on a friend item
  const handleFriendClick = async (friend) => {
    try {
      const friendId = friend._id;
      navigate(`/friends/${friendId}`); // Navigate to friend's profile page
    } catch (error) {
      console.error('Error navigating to Friends profile page:', error);
    }
  };

  // Event handler for unfriending a friend
  const handleUnFriend = () => {
    if (selectedFriend && currentUserData) {
      unfriend(
        { currentUserId: currentUserData._id, friendId: selectedFriend._id }, // Call unfriend mutation
        {
          onSuccess: () => {
            const updatedFriends = friends.filter((friend) => friend._id !== selectedFriend._id);
            setFriends(updatedFriends); // Update friends list after unfriending
            handleClosePopover(); // Close popover after unfriending
          }
        }
      );
    }
  };

  // Event handler for clicking delete (unfriend) icon
  const handleClickDelete = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(friend); // Set selected friend for unfriending
  };

  // Event handler for closing the popover
  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  // Filtered friends based on search input
  const filteredFriends = searchInput
    ? friends
        ?.filter((friend) => friend.username.toLowerCase().includes(searchInput.toLowerCase()))
        .sort((a, b) => a.username.localeCompare(b.username))
    : friends;

  // Conditional rendering based on loading, error, or data fetching state
  if (isLoadingFriends || isLoadingDogs || isLoadingUser || isLoadingUnfriend)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading friends.</Typography>;

  const open = Boolean(anchorEl);

  // Render UI for displaying and managing friends
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        {/* Search input field for filtering friends */}
        <TextField
          fullWidth
          label="Search Friends..."
          value={searchInput}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={8}>
        {/* List of filtered friends */}
        <List>
          {filteredFriends.map((friend) => (
            <ListItem
              key={friend._id}
              sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              onClick={() => handleFriendClick(friend)} // Trigger onClick event for friend click
            >
              {/* Avatar and details of each friend */}
              <ListItemAvatar>
                <Avatar src={friend.photoProfile || 'default_friend.jpg'} />
              </ListItemAvatar>
              <ListItemText primary={friend.username} secondary={friend.aboutMe} />
              {/* IconButton for unfriending a friend */}
              <ListItemSecondaryAction>
                <IconButton onClick={(event) => handleClickDelete(event, friend)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      {/* Popover for confirming unfriending action */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box p={2}>
          <Typography variant="body1">
            {selectedFriend && `Are you sure to unfriend ${selectedFriend?.username}?`}
          </Typography>
          {/* Confirm or cancel unfriending action */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleUnFriend} variant="contained">
              Yes
            </Button>
            <Button onClick={handleClosePopover} variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
    </Grid>
  );
};

export default Friends; // Export Friends component as default
