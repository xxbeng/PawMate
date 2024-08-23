// DogCreateUpdateDialog component for creating and updating dogs
import { yupResolver } from '@hookform/resolvers/yup';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Chip,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActions
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateDogMutation,
  useGetDogById,
  useUpdateDogMutation,
  useUploadDogProfilePictureMutation
} from '../../../queries/dogs';
import { CommonStyles } from '../../common/CommonStyles';
import DogFormBase from '../DogFormBase';
import { dogCreateSchema, dogUpdateSchema } from './DogCreateUpdate.validation';

// Default values for dog form
const defaultValues = {
  name: '',
  breed: '',
  dob: new Date(),
  owner: '',
  gender: '',
  weight: '',
  bio: '',
  neutered: false
};

// Dog create update dialog component, used for creating and updating dogs
const DogCreateUpdateDialog = ({ dogId }) => {
  const queryClient = useQueryClient(); // Query client for invalidating queries
  const [profilePicture, setProfilePicture] = useState(null); // Profile picture state

  // Handle image change
  const handleImageChange = (event) => {
    // Get file from event
    const file = event.target.files[0];
    // Check if file is image, set profile picture state, else set to null
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(file);
    } else {
      setProfilePicture(null);
    }
  };

  // Form control, handle submit, reset and set error
  const { control, handleSubmit, reset, setError } = useForm({
    mode: 'onSubmit',
    defaultValues,
    // Form validation schema
    resolver: yupResolver((dogId && dogUpdateSchema) || dogCreateSchema, {
      abortEarly: false,
      stripUnknown: true
    })
  });

  // Open state for dialog
  const [open, setOpen] = useState(false);

  // Toggle and invalidate function, used to close dialog and invalidate queries, used after create and update
  const toggleAndInvalidate = () => {
    setOpen(false);
    queryClient.invalidateQueries(['me', 'dogs']);
    if (dogId) queryClient.invalidateQueries(['dogs', dogId]);
  };

  // Get dog by id query, enabled only if dog id is present
  const { data: dog, isLoading } = useGetDogById(dogId, { enabled: !!dogId });
  // Mutation functions for create, update and upload dog profile picture
  const { mutate: mutateUploadDogProfilePicture } = useUploadDogProfilePictureMutation({
    // On success, toggle and invalidate, set profile picture to null after upload
    onSuccess: () => {
      toggleAndInvalidate();
      setProfilePicture(null);
    }
  });

  // Mutation functions for update dog, on success, if profile picture is present, upload profile picture, else toggle and invalidate
  const { mutate: mutateUpdateDog, error: mutateUpdateDogError } = useUpdateDogMutation(dogId, {
    onSuccess: () => {
      if (!profilePicture) return toggleAndInvalidate();
      return mutateUploadDogProfilePicture({ dogId, profilePicture });
    }
  });

  // Mutation functions for create dog, on success, if profile picture is present, upload profile picture, else toggle and invalidate
  const { mutate: mutateCreateDog, error: mutateCreateDogError } = useCreateDogMutation({
    onSuccess: (newDog) => {
      if (!profilePicture) return toggleAndInvalidate();
      return mutateUploadDogProfilePicture({ dogId: newDog._id, profilePicture });
    }
  });

  // Mutation error, used to set server errors
  const mutationError = mutateUpdateDogError || mutateCreateDogError;
  // Mutation function, used to determine which mutation function to call
  const mutationFunction = (dogId && mutateUpdateDog) || mutateCreateDog;

  // On form submit, call mutation function with form data
  useEffect(() => {
    const serverErrors = mutationError?.response?.data?.fields; // Server errors from response
    // If server errors, set errors,  else reset form
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [mutationError, setError]);

  // On open, reset form with dog data if present, else reset with default values
  useEffect(() => {
    if (dog) {
      reset(dog);
    }
    return () => {
      reset(defaultValues);
    };
  }, [dog, reset]);

  // If dialog is not open, return add dog or update dog chip button
  if (!open) {
    return (
      <Chip
        label={dogId ? 'Update Dog' : 'Add Dog'}
        onClick={() => setOpen(true)}
        sx={CommonStyles.chipButton}
      />
    );
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box component="form" onSubmit={handleSubmit(mutationFunction)}>
        <DialogTitle>{dogId ? 'Update Dog' : 'Add Dog'}</DialogTitle>
        <DialogContent>
          <DogFormBase
            isLoading={isLoading}
            control={control}
            handleImageChange={handleImageChange}
          />
          {mutationError && <p>An error occurred: {mutationError.message}</p>}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <CardActions
            disableSpacing
            sx={{
              ...CommonStyles.cardActions,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
            md={CommonStyles.cardActions}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={isLoading}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              {dogId ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="warning"
              disabled={isLoading}
              startIcon={<UndoIcon />}
              onClick={() => reset((dog && dog) || defaultValues)}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="success"
              startIcon={<CancelIcon />}
              onClick={() => setOpen(false)}
              sx={{ width: { xs: '100%', sm: 'auto' }, mt: 1, mx: { sm: 1 } }}
              md={CommonStyles.actionButton}
            >
              Cancel
            </Button>
          </CardActions>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// Define prop types
DogCreateUpdateDialog.propTypes = {
  dogId: PropTypes.string
};

export default DogCreateUpdateDialog;
