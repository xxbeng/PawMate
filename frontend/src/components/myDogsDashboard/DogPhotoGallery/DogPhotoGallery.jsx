// DogPhotoGallery component to display the photo gallery of a dog
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
  Tooltip,
  Input,
  useMediaQuery,
  useTheme,
  Modal
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  useGetPhotos,
  useCreatePhotoMutation,
  useDeletePhotoMutation
} from '../../../queries/photos';

// Upload dialog component, to upload photos
function UploadDialog({
  open,
  onClose,
  onFileChange,
  onUpload,
  previewUrl,
  uploadError,
  fileName
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Photo</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Input type="file" accept="image/*" onChange={onFileChange} />
          {fileName && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected file: {fileName}
            </Typography>
          )}
          {previewUrl && (
            <Box mt={2}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
            </Box>
          )}
          {uploadError && (
            <Box mt={2}>
              <Typography color="error">{uploadError}</Typography>
            </Box>
          )}
          <Box mt={2}>
            <Button variant="contained" onClick={onUpload} disabled={!previewUrl}>
              Upload
            </Button>
            <Button onClick={onClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// Delete dialog component, to delete photos
function DeleteDialog({ open, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Photo</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this photo?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Dog photo gallery component, to display the photo gallery of a dog
export default function DogPhotoGallery({ id }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const { data: photos, isLoading, refetch } = useGetPhotos(id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for mobile devices
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs')); // Extra small screen breakpoint
  const isLargeMobile = useMediaQuery(theme.breakpoints.down('md')); // Breakpoint for large mobile devices

  // Open the image modal with the selected photo
  const handleOpenImageModal = (photoUrl) => {
    setSelectedImage(photoUrl);
    setOpenImageModal(true);
  };

  // Close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage(null);
  };

  // Get the number of columns based on the screen size
  const getCols = () => {
    if (isSmallMobile) {
      return 1; // Single column for extra small screens
    } else if (isMobile) {
      return 1; // One columns for small screens
    } else if (isLargeMobile) {
      return 3; // Three columns for medium screens
    } else {
      return (photos.length <= 5 && photos.length) || 5; // Five columns for large screens
    }
  };

  // Get the image size based on the screen size
  const getImageSize = () => {
    if (isMobile) {
      return 342; // Fixed width of 342px for small screens
    } else {
      return 200; // Fixed width of 200px for larger screens
    }
  };

  // Create photo mutation, to create a new photo
  const { mutate: createPhoto } = useCreatePhotoMutation(id, {
    onSuccess: refetch
  });

  // Delete photo mutation, to delete a photo
  const { mutate: deletePhoto } = useDeletePhotoMutation(id, selectedPhoto?._id, {
    onSuccess: refetch
  });
  // Open the delete dialog with the selected photo
  const handleDeleteOpen = (photo) => {
    setSelectedPhoto(photo);
    setOpenDeleteDialog(true);
  };

  // Close the delete dialog
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedPhoto(null);
    refetch();
  };
  // Handle delete photo, to delete the selected photo
  const handleDelete = () => {
    if (selectedPhoto) {
      deletePhoto(
        { dogId: id, photoId: selectedPhoto._id },
        {
          onSuccess: () => {
            handleDeleteClose();
          }
        }
      );
    } else {
      console.error('No photo selected for deletion');
    }
  };

  // Open the upload dialog
  const handleUploadOpen = () => {
    setOpenUploadDialog(true);
  };

  // Close the upload dialog
  const handleUploadClose = () => {
    setOpenUploadDialog(false);
    setFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    refetch();
  };

  // Handle file change, to set the selected file and preview the image
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // Handle upload, to upload the selected file
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      createPhoto(formData, {
        onSuccess: () => {
          handleUploadClose();
        }
      });
    } catch (error) {
      setUploadError('Failed to upload the image. Please try again.');
      console.error('Upload error:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        mt={2}
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Raleway',
          color: '#2a2a2a'
        }}
      >
        <PetsIcon fontSize="large" sx={{ color: '#aad5dc', opacity: 0.5 }} />
        <span style={{ marginLeft: 12, marginRight: 1 }}>Gallery </span>
        <PetsIcon fontSize="large" sx={{ color: '#aad5dc', opacity: 0.5 }} />
      </Typography>
      <ImageList
        sx={{
          width: '100%',
          height: 'auto'
        }}
        gap={4}
        cols={getCols()}
        rowHeight={getImageSize()} // Use getImageSize to set the rowHeight
      >
        {photos.map((photo) => (
          <ImageListItem key={photo.url}>
            <img
              src={`${process.env.REACT_APP_API_URL}/${photo.url}?w=${getImageSize()}&h=${getImageSize()}&fit=crop&auto=format`}
              name="add-photo"
              alt="Dog"
              loading="lazy"
              style={{
                width: '100%', // Span the full width of the column
                height: '100%', // Maintain a square aspect ratio
                objectFit: 'cover',
                aspectRatio: '1/1',
                cursor: 'pointer'
              }}
              onClick={() => handleOpenImageModal(`${process.env.REACT_APP_API_URL}/${photo.url}`)} // Add click handler
            />
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDeleteOpen(photo)}
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 1,
                  opacity: 0.3,
                  '&:hover': { opacity: 1 }
                }}
              >
                <DeleteIcon fontSize={isMobile ? 'small' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </ImageListItem>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={getImageSize()}
          height={getImageSize()}
          border="1px dashed gray"
          borderRadius="8px"
          onClick={handleUploadOpen}
          style={{ cursor: 'pointer' }}
          sx={{ backgroundColor: '#fafcfd' }}
        >
          <AddCircleOutlineIcon fontSize={isMobile ? 'large' : 'large'} color="action" />
        </Box>
      </ImageList>
      <DeleteDialog open={openDeleteDialog} onClose={handleDeleteClose} onDelete={handleDelete} />
      <UploadDialog
        open={openUploadDialog}
        onClose={handleUploadClose}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        previewUrl={previewUrl}
        uploadError={uploadError}
        fileName={file ? file.name : ''}
      />
      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        onClick={handleCloseImageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ cursor: 'pointer' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90vw',
            maxWidth: '1000px',
            maxHeight: '90vh',
            bgcolor: 'transparent',
            p: 4
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              maxWidth: '900px',
              maxHeight: '750px'
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}

// Define prop types for DogPhotoGallery component
DogPhotoGallery.propTypes = {
  id: PropTypes.string.isRequired
};

// Define prop types for UploadDialog
UploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  previewUrl: PropTypes.string,
  uploadError: PropTypes.string,
  fileName: PropTypes.string
};

// Define prop types for DeleteDialog
DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
