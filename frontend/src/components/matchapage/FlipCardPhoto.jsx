// FlipCardPhoto component to display dog photos in a flip card
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useGetPhotos } from '../../queries/photos';

// Styled dialog with transparent background
const TransparentDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

// FlipCardPhoto component definition
const FlipCardPhoto = ({ id }) => {
  // State for selected photo and fetching photos from API
  const { data: photos, isLoading, error } = useGetPhotos(id);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Handle opening a photo in a dialog
  const handleOpenPhoto = (photo, event) => {
    event.stopPropagation(); // Prevent event bubbling
    setSelectedPhoto(photo);
  };

  // Handle closing the photo dialog
  const handleClosePhoto = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setSelectedPhoto(null);
  };

  // Render loading state while fetching photos
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  // Render error message if there's an error fetching photos
  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error loading photos: {error.message}
      </Typography>
    );
  }

  // Render component with dog photos or a message if no photos are found
  return (
    <Box mt={2}>
      {/* Section title with photo library icon */}
      <Typography variant="h6">
        <PhotoLibraryIcon />
        <span> </span>
        Dog Photos
      </Typography>

      {/* Render dog photos in an ImageList */}
      {photos && photos.length > 0 ? (
        <ImageList gap={4} sx={{ width: '100%', height: 'auto' }}>
          {photos.map((photo) => (
            <ImageListItem key={photo.url} onClick={(e) => handleOpenPhoto(photo, e)}>
              {/* Display image thumbnail with click handler */}
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo.url}`}
                alt="Dog"
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1/1',
                  cursor: 'pointer'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="body1">No photos found for this dog.</Typography>
      )}

      {/* Dialog for displaying selected photo in full view */}
      <TransparentDialog
        open={selectedPhoto !== null} // Open dialog if a photo is selected
        onClose={handleClosePhoto} // Close dialog handler
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          {/* Close button in the dialog */}
          <IconButton
            aria-label="close"
            onClick={(e) => handleClosePhoto(e)}
            sx={{ position: 'absolute', top: 5, right: 5, color: 'inherit' }}
          >
            <CloseIcon />
          </IconButton>
          {/* Display selected photo in the dialog */}
          <img
            src={`${process.env.REACT_APP_API_URL}/${selectedPhoto?.url}`}
            alt="Dog"
            style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
      </TransparentDialog>
    </Box>
  );
};

// PropTypes for the FlipCardPhoto component
FlipCardPhoto.propTypes = {
  id: PropTypes.string.isRequired // Requires an ID prop of type string
};

export default FlipCardPhoto;
