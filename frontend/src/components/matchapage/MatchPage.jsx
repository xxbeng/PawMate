// MatchPage component, which displays potential mates for the user to swipe through
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import CloseIcon from '@mui/icons-material/Close';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FemaleIcon from '@mui/icons-material/Female';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import PetsIcon from '@mui/icons-material/Pets';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Box, Button, Typography, Snackbar, IconButton } from '@mui/material'; // Import necessary icons and components from Material-UI and other libraries
import useMediaQuery from '@mui/material/useMediaQuery';
import Hammer from 'hammerjs'; // External library for touch gestures
import PropTypes from 'prop-types'; // For defining prop types
import React, { useState, useEffect, useCallback } from 'react'; // React hooks and components
import ReactCardFlip from 'react-card-flip'; // Component for flipping cards
import TinderCard from 'react-tinder-card'; // Tinder-like swipeable card component
import { useLikeDogMutation } from '../../queries/friends'; // Mutation hook for liking dogs
import { useGetPotentialMates } from '../../queries/matches'; // Query hook for fetching potential mates
import { CommonStyles } from '../common/CommonStyles'; // Common styles used across components
import Filter from './Filter'; // Component for filters
import FlipCardPhoto from './FlipCardPhoto'; // Component for flipping card photo
import FriendList from './FriendList'; // Component for displaying friend list

// Helper function to calculate age from date of birth
const getDogAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Helper function to calculate age in years and months from date of birth
// Calculate age in years and months
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

// Helper function to filter dogs based on specified filters
// Filter dogs based on breed, gender, age, and neutered status
const filterDogs = (dogs, { breeds, gender, age, neutered }) => {
  return dogs.filter((dog) => {
    const ageInYears = getDogAge(dog.dob);
    return (
      (breeds.length === 0 || breeds.includes(dog.breed)) &&
      ((gender === 'all' && true) || gender === dog.gender) &&
      ((neutered === 'all' && true) || neutered === dog.neutered.toString()) &&
      age.min <= ageInYears &&
      age.max >= ageInYears
    );
  });
};

// MatchPage component
const MatchPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Mutation hook for liking dogs
  const { mutate: likeDog } = useLikeDogMutation();

  // State hooks for managing component state
  const [filters, setFilters] = useState({
    manualMatch: false,
    breeds: [],
    gender: 'all',
    age: {
      min: 0,
      max: 100
    },
    neutered: 'all'
  });
  const { data: potentialMates, isLoading, error } = useGetPotentialMates(filters.manualMatch); // Query hook for fetching potential mates
  const [shuffledMates, setShuffledMates] = useState([]); // State for shuffled potential mates
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // State for current card index
  const [showLastCardMessage, setShowLastCardMessage] = useState(false); // State for showing last card message
  const [showFilter, setShowFilter] = useState(false); // State for showing filter component
  const [showFriendList, setShowFriendList] = useState(false); // State for showing friend list component
  const [isFlipped, setIsFlipped] = useState(false); // State for card flip
  const [isIconClose, setIsIconClose] = useState(false); // State for filter icon
  const [isClose, setIsClose] = useState(false); // State for close icon

  // Toggle filter component visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    setIsClose(!isClose);
  };

  // Toggle friend list component visibility
  const toggleFriendList = () => {
    setShowFriendList(!showFriendList);
    setIsIconClose(!isIconClose);
  };

  // Handle card flip
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Effect to handle changes in potential mates or filters
  // Logic to update shuffledMates based on filters and potential mates
  useEffect(() => {
    if (potentialMates && potentialMates.length > 0) {
      const filteredArray = filterDogs(potentialMates, filters);
      const shuffledArray = shuffleArray(filteredArray);
      // Only update state if shuffledMates or currentCardIndex are different
      if (!arraysEqual(shuffledArray, shuffledMates)) {
        setShuffledMates(shuffledArray);
        setCurrentCardIndex(0);
      }
    } else {
      setShuffledMates([]);
      setCurrentCardIndex(0);
    } // eslint-disable-next-line
  }, [filters, potentialMates]);

  // Utility function to compare arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  // Helper function to shuffle array
  // Shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Handle swipe action on card
  // Logic to handle swipe direction and update current card index
  const handleSwipe = useCallback(
    (direction) => {
      if (shuffledMates && shuffledMates.length > 0) {
        const nextIndex = currentCardIndex + 1;

        // Determine which side of the card is currently visible
        const cardElement = document.getElementById(`card-${currentCardIndex}`);
        const isFlipped = cardElement?.classList.contains('ReactCardFlip__cardBack');

        // Define the card element to swipe based on its visibility
        const swipeElement = isFlipped ? cardElement?.children[1] : cardElement?.children[0];

        if (swipeElement) {
          const rotation = direction === 'right' ? 10 : -10;
          const opacity = direction === 'right' ? 0 : 1;

          swipeElement.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
          swipeElement.style.transform = `translate(${direction === 'right' ? '100%' : '-100%'}, 0) rotate(${rotation}deg)`;
          swipeElement.style.opacity = opacity;

          setTimeout(() => {
            if (nextIndex >= shuffledMates.length) {
              setShowLastCardMessage(true);
            } else {
              setCurrentCardIndex(nextIndex);
            }
          }, 300);
        }
      }
    },
    [currentCardIndex, shuffledMates]
  );

  // Handle close message
  const handleCloseMessage = () => {
    setShowLastCardMessage(false);
  };

  useEffect(() => {
    const cardElement = document.getElementById(`card-${currentCardIndex}`);
    if (cardElement) {
      const hammertime = new Hammer(cardElement);
      hammertime.on('pan', (event) => {
        if (event.deltaX === 0) return;
        const rotation = event.deltaX / 15;
        const scale = Math.min(1, Math.abs(event.deltaX) / 500);
        cardElement.style.transform = `translate(${event.deltaX}px, 0) rotate(${rotation}deg) scale(${scale})`;
      });
      hammertime.on('panend', (event) => {
        const isFarEnough = Math.abs(event.deltaX) > 150;
        const direction = event.deltaX > 0 ? 'right' : 'left';
        if (isFarEnough) {
          handleSwipe(direction);
        } else {
          cardElement.style.transition = 'transform 0.3s ease';
          cardElement.style.transform = '';
        }
      });

      return () => {
        hammertime.destroy();
      };
    }
  }, [currentCardIndex, handleSwipe]);

  // Handle swipe left action
  // Logic to handle left swipe
  const handleSwipeLeft = () => {
    if (currentCardIndex < shuffledMates.length - 1) {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.style.transition = 'transform 0.3s ease';
        cardElement.style.transform = 'translate(-100%, 0) rotate(-10deg) scale(0.8)';
        handleSwipe('left');

        setTimeout(() => {
          cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }, 300);
      }
    } else {
      setShowLastCardMessage(true); // Display last card message
    }
  };

  // Handle swipe right action
  // Logic to handle right swipe and like a dog
  const handleSwipeRight = () => {
    likeDog(shuffledMates[currentCardIndex]?._id);
    if (currentCardIndex < shuffledMates.length - 1) {
      const cardElement = document.getElementById(`card-${currentCardIndex}`);
      if (cardElement) {
        cardElement.style.transition = 'transform 0.3s ease';
        cardElement.style.transform = 'translate(100%, 0) rotate(10deg) scale(0.8)';
        handleSwipe('right');

        setTimeout(() => {
          cardElement.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        }, 300);
      }
    } else {
      setShowLastCardMessage(true); // Display last card message
    }
  };

  // Render gender icon based on gender
  const renderGenderIcon = (gender) => {
    return gender === 'Female' ? <FemaleIcon /> : <MaleIcon />;
  };

  // Handle when card goes out of frame
  const outOfFrame = (name, direction) => {
    if (direction === 'right') {
      likeDog(shuffledMates[currentCardIndex]?._id);
    }
  };

  // Helper function to format date of birth
  const simplyDob = (dob) => {
    const birthDate = new Date(dob);
    const year = birthDate.getFullYear();
    const month = ('0' + (birthDate.getMonth() + 1)).slice(-2);
    const day = ('0' + birthDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  // Helper function to get neutered status
  const getNeuteredStatus = (neutered) => {
    return neutered ? 'Yes' : 'No';
  };

  // Component to render match information line
  const MatchInfoLine = ({ icon: Icon, label, value }) => (
    <Typography
      variant="h4"
      sx={{
        ...CommonStyles.matchNameBack,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '300px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon />
        <span style={{ fontWeight: 'normal', marginLeft: '20px' }}>{label}</span>:
      </Box>
      <Box ml={1} fontWeight="bold" flex="1">
        {value}
      </Box>
    </Typography>
  );

  // JSX rendering for MatchPage component
  return (
    <Box data-testid="match-page">
      {/* Button to toggle filter component */}
      {!showFilter && !(isSmallScreen && showFriendList) && (
        <IconButton
          onClick={toggleFilter}
          color="primary"
          data-testid="filter-toggle-button"
          sx={{
            position: 'fixed',
            top: '70px',
            left: '8px',
            zIndex: 1100
          }}
        >
          <FilterListRoundedIcon />
        </IconButton>
      )}

      {/* Button to toggle friend list component */}
      {!showFriendList && !(isSmallScreen && showFilter) && (
        <IconButton
          onClick={toggleFriendList}
          color="secondary"
          data-testid="friend-list-button"
          sx={{
            position: 'fixed',
            top: 70,
            right: 8,
            zIndex: 1100
          }}
        >
          <Diversity1RoundedIcon />
        </IconButton>
      )}

      {/* Main content of MatchPage */}
      <Box className="dashboard" sx={CommonStyles.matchDashboard}>
        {/* Render filter component if showFilter is true */}
        {showFilter && (
          <Filter
            setIsManualMatch={filters.manualMatch}
            setTinderFilters={setFilters}
            toggleFilter={toggleFilter}
          />
        )}
        {/* Render friend list component if showFriendList is true */}
        {showFriendList && <FriendList toggleFriendList={toggleFriendList} />}

        {/* Conditionally render loading state, error state, or potential mates */}
        {isLoading ? (
          <Typography variant="h6">Loading potential mates...</Typography>
        ) : error ? (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Error fetching potential mates: {error.message}
          </Typography>
        ) : shuffledMates && shuffledMates.length > 0 ? (
          // Render TinderCard with ReactCardFlip for swipeable cards
          <TinderCard
            key={shuffledMates[currentCardIndex]?.name}
            onCardLeftScreen={(direction) =>
              outOfFrame(shuffledMates[currentCardIndex]?.name, direction)
            }
            preventSwipe={['up', 'down']}
            threshold={100}
            sx={{
              width: { xs: '100%', sm: '50%', md: '25%' },
              padding: { xs: 1, sm: 2, md: 3 },
              overflow: 'hidden',
              maxHeight: '80vh'
            }}
          >
            {/* Render front and back of card using ReactCardFlip */}
            <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
              {/* Front of the card */}
              <Box
                id={`card-${currentCardIndex}`}
                className="card"
                sx={{
                  ...CommonStyles.matchCardFront,
                  backgroundImage: `url(${process.env.REACT_APP_API_URL}/${shuffledMates[currentCardIndex]?.profilePicture})`
                }}
                onClick={flipCard}
              >
                {/* Content on the front side of the card */}
                <Typography variant="h4" sx={CommonStyles.matchName}>
                  {shuffledMates[currentCardIndex]?.name}
                  {renderGenderIcon(shuffledMates[currentCardIndex]?.gender)}
                </Typography>
                <Typography variant="h6" sx={CommonStyles.matchBreed}>
                  {shuffledMates[currentCardIndex]?.breed}
                </Typography>
                <Typography variant="body1" sx={CommonStyles.matchInfo}>
                  {shuffledMates[currentCardIndex]?.weight} kg |{' '}
                  {calculateAge(shuffledMates[currentCardIndex]?.dob)}
                </Typography>
              </Box>

              {/* Back of the card */}
              <Box
                id={`card-${currentCardIndex}`}
                className="card"
                sx={{
                  ...CommonStyles.matchCardBack
                }}
                onClick={flipCard}
              >
                {/* Content on the back side of the card */}
                <MatchInfoLine
                  icon={AutoAwesomeIcon}
                  label="Name"
                  value={shuffledMates[currentCardIndex]?.name}
                />
                <MatchInfoLine
                  icon={PetsIcon}
                  label="Breed"
                  value={shuffledMates[currentCardIndex]?.breed}
                />
                <MatchInfoLine
                  icon={MonitorWeightIcon}
                  label="Weight"
                  value={`${shuffledMates[currentCardIndex]?.weight} kg`}
                />
                <MatchInfoLine
                  icon={BadgeIcon}
                  label="Age"
                  value={calculateAge(shuffledMates[currentCardIndex]?.dob)}
                />
                <MatchInfoLine
                  icon={CakeIcon}
                  label="Birthday"
                  value={simplyDob(shuffledMates[currentCardIndex]?.dob)}
                />
                <MatchInfoLine
                  icon={FavoriteBorderIcon}
                  label="Neutered"
                  value={getNeuteredStatus(shuffledMates[currentCardIndex]?.neutered)}
                />
                <MatchInfoLine
                  icon={LocationOnIcon}
                  label="Distance"
                  value={`${shuffledMates[currentCardIndex]?.distance.toFixed(3)} km`}
                />
                <Typography variant="h4" sx={CommonStyles.matchBio}>
                  <SentimentSatisfiedAltIcon />
                  <span> </span>
                  <span style={{ fontWeight: 'normal' }}>About Me: </span>
                  <br />
                  {shuffledMates[currentCardIndex]?.bio}
                </Typography>
                <FlipCardPhoto id={shuffledMates[currentCardIndex]?._id} />
              </Box>
            </ReactCardFlip>
          </TinderCard>
        ) : (
          // Render message if no potential mates found
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">No potential mates found.</Typography>
          </Box>
        )}

        {/* Snackbar for showing last card message */}
        <Snackbar
          open={showLastCardMessage}
          autoHideDuration={3000}
          onClose={handleCloseMessage}
          message="No more cards available. You've reached the end."
        />

        {/* Buttons for left and right swipe actions */}
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* Button for left swipe */}
          <Button
            data-testid="swipe-left-button"
            variant="contained"
            onClick={handleSwipeLeft}
            sx={{
              ...CommonStyles.matchButton,
              '@media (max-width: 768px)': {
                padding: '10px 20px',
                minWidth: '120px'
              }
            }}
          >
            <CloseIcon fontSize="large" />
          </Button>

          {/* Button for right swipe */}
          <Button
            data-testid="swipe-right-button"
            variant="contained"
            onClick={handleSwipeRight}
            sx={{
              ...CommonStyles.matchButton,
              '@media (max-width: 768px)': {
                padding: '10px 20px',
                minWidth: '120px'
              }
            }}
          >
            <FavoriteIcon fontSize="large" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// PropTypes for MatchInfoLine component
MatchPage.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// Export MatchPage component
export default MatchPage;
