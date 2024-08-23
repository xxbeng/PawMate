// UserProfile component is a form that allows the user to view and edit their profile details
import { joiResolver } from '@hookform/resolvers/joi';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
  Grid,
  CardActions,
  FormHelperText
} from '@mui/material';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useUpdateUserMutation, useGetUser } from '../../queries/user.js';
import { userDataStorage } from '../../utils/localStorageNames.js';
import { APPLICATION_PATH } from '../../utils/urlRoutes';
import { CommonStyles } from '../common/CommonStyles.jsx';
import { userProfileSchema } from './UserProfile.validation.jsx';

//Define an array with the name of the Google Maps libraries to be loaded.
const libraries = ['places'];

// Use of the useUpdateUserMutation hook which returns an object with a mutate function - updateUserProfile that we can use to execute the mutation.
// When the mutation is successful, it receives the updated user profile as an argument.
// The updated user profile data is then saved to local storage and the user state is updated with this new data.

const UserProfile = () => {
  const { mutate: updateUserProfile } = useUpdateUserMutation((userProfile) => {
    userDataStorage.save(userProfile.data);
    setUser(userProfile.data);
  });

  const { currentUser, setUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const { data: currentUserData, isLoading } = useGetUser(currentUser?.username);

  //managing edit mode in the UserProfile component
  const [edit, setEdit] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(userProfileSchema)
  });

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    register('address');
  }, [register]);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  //The onPlaceChanged function is called when the user selects a place from the dropdown list.
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address && place.geometry) {
        setAddress(place.formatted_address);
        setValue('address', place.formatted_address, { shouldValidate: true });
        setValue('latitude', place.geometry.location.lat().toString(), { shouldValidate: false });
        setValue('longitude', place.geometry.location.lng().toString(), { shouldValidate: false });
        setAddressError('');
        setIsAddressValid(true);
      } else {
        setIsAddressValid(false);
        setAddressError('Please select a valid street address from the dropdown.');
      }
    }
    console.log(isAddressValid);
  };

  //The handleSave function is called when the user clicks the Save button. It calls the updateUserProfile mutation function to update the user profile with the new data.
  const handleSave = () => {
    handleSubmit(updateUserProfile)();
    setEdit(false);
  };
  //The handleCancel function is called when the user clicks the Cancel button. It navigates the user back to the homepage.
  const handleCancel = () => {
    navigate(APPLICATION_PATH.homepage);
  };
  //The handleAddressBlur function is called when the user clicks outside the address input field. It checks if the address is valid and displays an error message if it is not.
  const handleAddressBlur = () => {
    if (!isAddressValid) {
      setAddressError('Please select a valid address from the dropdown.');
      setValue('latitude', '', { shouldValidate: false });
      setValue('longitude', '', { shouldValidate: false });
    }
  };
  //The debounce function is used to limit the number of times the autocompleteRef.current.set function is called when the user types in the address input field.
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };
  //The debouncedSearch function is called when the user types in the address input field. It debounces the search input to prevent the autocompleteRef.current.set function from being called too frequently.
  const debouncedSearch = useCallback((value) => {
    const debounced = debounce((value) => {
      if (autocompleteRef.current) {
        autocompleteRef.current.set('input', value);
      }
    }, 500);
    debounced(value);
  }, []);

  //The handleAddressChange function is called when the user types in the address input field.
  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    setIsAddressValid(false);

    if (!newAddress || newAddress.length < 3) {
      setValue('latitude', '', { shouldValidate: false });
      setValue('longitude', '', { shouldValidate: false });
      setAddressError('Address is too short.');
    } else {
      debouncedSearch(newAddress);
    }
  };

  useEffect(() => {
    if (!isLoading && currentUserData) {
      setUserData(currentUserData);
      setLatitude(currentUserData.latitude);
      setLongitude(currentUserData.longitude);
      setAddress(currentUserData.address);
      setValue('address', currentUserData.address, { shouldValidate: false });
      setValue('latitude', currentUserData.latitude, { shouldValidate: false });
      setValue('longitude', currentUserData.longitude, { shouldValidate: false });
    }
  }, [isLoading]);

  if (!userData) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={CommonStyles.formContainer}
      onSubmit={handleSubmit(updateUserProfile)}
    >
      <Box sx={CommonStyles.formHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="subtitle" component="p">
          Your account details.
        </Typography>
      </Box>

      <Box>
        <Controller
          name="username"
          control={control}
          defaultValue={currentUserData.username}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="username"
                label="Username"
                fullWidth
                autoFocus
                margin="normal"
                error={!!error}
                disabled={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  readOnly: true
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={currentUserData.email}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="email"
                name="email"
                label="Email Address"
                type="email"
                margin="normal"
                fullWidth
                error={!!error}
                onChange={(e) => {
                  field.onChange(e);
                  setEdit(true);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailIcon />
                    </InputAdornment>
                  )
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        {isLoaded ? (
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Controller
              name="address"
              control={control}
              defaultValue={currentUserData.address}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={handleAddressChange}
                    onBlur={handleAddressBlur} // Add onBlur event handler here
                    error={!!error || addressError !== ''}
                    helperText={error?.message || addressError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Autocomplete>
        ) : (
          <CircularProgress />
        )}

        <Controller
          name="phone"
          control={control}
          defaultValue={currentUserData.phone}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="phone"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  field.onChange(e);
                  setEdit(true);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  )
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="aboutMe"
          control={control}
          defaultValue={currentUserData.aboutMe}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                id="aboutMe"
                name="aboutMe"
                label="About Me"
                margin="normal"
                fullWidth
                error={!!error}
                multiline
                rows={4}
                onChange={(e) => {
                  field.onChange(e);
                  setEdit(true);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InfoIcon />
                    </InputAdornment>
                  )
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="latitude"
              name="latitude"
              label="Latitude"
              type="text"
              disabled={true}
              {...register('latitude')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: !edit
              }}
              margin="normal"
              fullWidth
              value={latitude}
              error={Boolean(errors.latitude)}
              helperText={errors.latitude ? errors.latitude.message : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="longitude"
              name="longitude"
              label="Longitude"
              type="text"
              disabled={true}
              {...register('latitude')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon />
                  </InputAdornment>
                )
              }}
              inputProps={{
                readOnly: !edit
              }}
              margin="normal"
              fullWidth
              {...register('longitude')}
              value={longitude}
              error={Boolean(errors.longitude)}
              helperText={errors.longitude ? errors.longitude.message : ''}
            />
          </Grid>
        </Grid>
        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSave}
            sx={CommonStyles.actionButton}
            disabled={!isAddressValid && !edit}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </CardActions>

        <CardActions disableSpacing sx={CommonStyles.cardActions}>
          <Button
            type="button"
            variant="outlined"
            color="success"
            onClick={handleCancel}
            sx={CommonStyles.actionButton}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </CardActions>
      </Box>
    </Box>
  );
};

export default UserProfile;
