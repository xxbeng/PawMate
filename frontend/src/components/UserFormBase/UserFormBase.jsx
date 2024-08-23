// UserFormBase component to render the user registration form
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PasswordIcon from '@mui/icons-material/Password';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { CommonStyles } from '../common/CommonStyles';

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const libraries = ['places'];

const UserFormBase = ({ control, isPendingSignup, setValue, handleLoginClick }) => {
  const [address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    // eslint-disable-next-line no-undef
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const debouncedSearch = useCallback((value) => {
    const debounced = debounce((value) => {
      if (autocompleteRef.current) {
        autocompleteRef.current.set('input', value);
      }
    }, 500);
    debounced(value);
  }, []);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const [addressError, setAddressError] = useState('');

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address && place.geometry) {
        // Valid address
        setAddress(place.formatted_address);

        setValue('latitude', place.geometry.location.lat().toString(), { shouldValidate: false });
        setValue('longitude', place.geometry.location.lng().toString(), { shouldValidate: false });
        setValue('address', place.formatted_address, { shouldValidate: true });

        setAddressError(''); // Clear any existing error message
        setIsAddressValid(true); // Set isAddressValid to true indicating a valid address has been selected
      } else {
        setAddressError('Please select a valid street address from the dropdown.');
        setIsAddressValid(false);
      }
    }
  };

  const handleAddressBlur = () => {
    if (!isAddressValid) {
      setAddressError('Please select a valid address from the dropdown.');
      setValue('latitude', '', { shouldValidate: false });
      setValue('longitude', '', { shouldValidate: false });
    }
  };

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
  return (
    <>
      <Box>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Username"
                fullWidth
                autoFocus
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactMailIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="Phone"
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhoneIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
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
                    sx={CommonStyles.autoCompleteBox}
                    disabled={isPendingSignup}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Autocomplete>
        ) : (
          <CircularProgress />
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="latitude"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Latitude"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MyLocationIcon />
                        </InputAdornment>
                      )
                    }}
                    disabled={true}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="longitude"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    {...field}
                    label="Longitude"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MyLocationIcon />
                        </InputAdornment>
                      )
                    }}
                    disabled={true}
                  />
                  {error && <FormHelperText error>{error.message}</FormHelperText>}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Controller
          name="aboutMe"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                label="About Me"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InfoIcon />
                    </InputAdornment>
                  )
                }}
                disabled={isPendingSignup}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
      </Box>
      <CardActions disableSpacing sx={CommonStyles.cardActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          disabled={!isAddressValid || isPendingSignup}
          sx={CommonStyles.actionButton}
        >
          Register
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<VpnKeyIcon />}
          onClick={handleLoginClick}
          sx={CommonStyles.actionButton}
        >
          Login
        </Button>
      </CardActions>
    </>
  );
};

UserFormBase.propTypes = {
  setValue: PropTypes.func.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  isPendingSignup: PropTypes.bool.isRequired
};

export default UserFormBase;
