// FriendList component, which displays a list of friends and allows the user to unfriend them
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
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
  CardActionArea
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGetDogs } from '../../queries/dogs';
import { useGetFriends, useUnfriendMutation } from '../../queries/friends';
import { useGetUser } from '../../queries/user';

const FriendList = ({ toggleFriendList }) => {
  // Authentication and data fetching hooks
  const { currentUser } = useAuth();
  const { data: currentUserData, isLoading: isLoadingUser } = useGetUser(currentUser?.username);
  const { data: dogs, isLoading: isLoadingDogs } = useGetDogs();
  const { data: friendsData, isLoading: isLoadingFriends, isError } = useGetFriends();
  const { mutate: unfriend, isLoading: isLoadingUnfriend } = useUnfriendMutation();

  // State management
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const navigate = useNavigate();
  const randomDog = dogs ? dogs[Math.floor(Math.random() * dogs.length)] : null;

  // Effect for sorting friends when data changes
  useEffect(() => {
    if (!isLoadingDogs && dogs && dogs.length === 0) {
      console.error('No dogs available');
    }
    if (friendsData) {
      const sortedFriends = [...friendsData].sort((a, b) => a.username.localeCompare(b.username));
      setFriends(sortedFriends);
    }
  }, [isLoadingDogs, dogs, friendsData]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle clicking on a friend item
  const handleFriendClick = async (friend) => {
    try {
      const friendId = friend._id;
      navigate(`/friends/${friendId}`);
    } catch (error) {
      console.error('Error navigating to DogsByFriendPage:', error);
    }
  };

  // Handle unfriending a friend
  const handleUnFriend = () => {
    if (selectedFriend && currentUserData) {
      unfriend(
        { currentUserId: currentUserData._id, friendId: selectedFriend._id },
        {
          onSuccess: () => {
            const updatedFriends = friends.filter((friend) => friend._id !== selectedFriend._id);
            setFriends(updatedFriends);
            handleClosePopover();
          }
        }
      );
    }
  };

  // Handle clicking delete icon to open popover
  const handleClickDelete = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(friend);
  };

  // Handle closing the popover
  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  // Filter friends based on search input
  const filteredFriends = searchInput
    ? friends
        ?.filter((friend) => friend.username.toLowerCase().includes(searchInput.toLowerCase()))
        .sort((a, b) => a.username.localeCompare(b.username))
    : friends;

  // Render loading state
  if (isLoadingFriends || isLoadingDogs || isLoadingUser || isLoadingUnfriend)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading friends.</Typography>;

  // Boolean to check if popover is open
  const open = Boolean(anchorEl);

  // Initial Avatar
  function getInitials(name = '') {
    if (!name) return ''; // Return an empty string if the name is falsy

    let initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase(); // Convert to uppercase if necessary
    return initials.slice(0, 2);
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        position: 'fixed',
        top: 0,
        right: 0,
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white',
        '@media (min-width: 600px)': {
          width: '25%' // On larger screens, set the width to 25%
        },
        zIndex: 1000
      }}
    >
      <IconButton
        onClick={toggleFriendList}
        color="secondary"
        data-testid="filter-toggle-button"
        sx={{
          zIndex: 1100
        }}
      >
        <CancelRoundedIcon />
      </IconButton>
      {/* User profile card */}
      <Card>
        <CardActionArea component={Link} to="/profile">
          <CardMedia
            component="img"
            height="300"
            image={`${process.env.REACT_APP_API_URL}/${randomDog.profilePicture}`}
            alt="Dog Photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {currentUserData?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUserData?.aboutMe}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Search input */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2
        }}
      >
        <TextField
          fullWidth
          label="Search Friends..."
          value={searchInput}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ m: 2 }}
        />
        <IconButton onClick={handleSearchChange}>
          <ManageSearchRoundedIcon />
        </IconButton>
      </Box>

      {/* Friends list */}
      <List data-testid="friend-list">
        {filteredFriends.map((friend) => (
          <ListItem
            key={friend._id}
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
            onClick={() => handleFriendClick(friend)}
          >
            <ListItemAvatar>
              <Avatar>{getInitials(friend.username)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.username} secondary={friend.aboutMe} />
            <ListItemSecondaryAction>
              {/* Delete friend button */}
              <IconButton onClick={() => handleClickDelete(event, friend)}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Popover for confirmation */}
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
          <Box mt={2} display="flex" justifyContent="space-between">
            {/* Confirm and cancel buttons */}
            <Button onClick={handleUnFriend} variant="contained">
              Yes
            </Button>
            <Button onClick={handleClosePopover} variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
FriendList.propTypes = {
  toggleFriendList: PropTypes.func
};
export default FriendList;
