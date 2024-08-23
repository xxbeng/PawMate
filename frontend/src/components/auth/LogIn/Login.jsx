// Login component for the application
import { joiResolver } from '@hookform/resolvers/joi';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Alert,
  CircularProgress,
  Box,
  TextField,
  Typography,
  Button,
  CardActions
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { APPLICATION_PATH } from '../../../utils/urlRoutes';
import { CommonStyles } from '../../common/CommonStyles';
import { loginSchema } from './Login.validation';

// Login component for the application
const Login = () => {
  // Get the login function, login errors, isAuthenticated and isPendingLogin from the AuthContext
  const { login, loginErrors, isAuthenticated, isPendingLogin } = useAuth();

  let navigate = useNavigate();

  // Redirect to the dashboard if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(APPLICATION_PATH.dashboard);
    }
  }, [isAuthenticated, navigate]);

  // Form validation using react-hook-form and joi
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(loginSchema)
  });
  // Set server errors to the form fields
  useEffect(() => {
    const serverErrors = loginErrors?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [loginErrors, setError]);

  // Handle the SignUp button click
  const handleSignUpClick = () => {
    navigate(APPLICATION_PATH.auth.signup); // Navigate to the SignUp route
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(login)}
      noValidate
      sx={{ ...CommonStyles.formContainer, ...CommonStyles.loginFormContainer }}
    >
      <Box sx={CommonStyles.loginHeaderContainer}>
        <Box component="img" src="/logo.png" sx={CommonStyles.loginHeaderImage} />
        <Typography variant="h4" gutterBottom sx={CommonStyles.loginHeaderText}>
          PawMate
        </Typography>
      </Box>

      <Box>
        {/* Text Fields */}
        <TextField
          autoFocus
          required
          fullWidth
          margin="normal"
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
          {...register('username')}
          error={Boolean(errors.username)}
          helperText={errors.username ? errors.username.message : ''}
          disabled={isPendingLogin}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          id="password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )
          }}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          disabled={isPendingLogin}
        />
      </Box>
      <CardActions disableSpacing sx={CommonStyles.cardActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<VpnKeyIcon />}
          sx={CommonStyles.actionButton}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="success"
          startIcon={<PersonAddIcon />}
          onClick={handleSignUpClick}
          sx={CommonStyles.actionButton}
        >
          Register
        </Button>
      </CardActions>

      {/* Progress Indicator and Alert */}
      {isPendingLogin && <CircularProgress size={24} sx={CommonStyles.progressIndicator} />}
      {loginErrors && (
        <Alert severity="error" sx={CommonStyles.alert}>
          Failed to login:{' '}
          {loginErrors?.response?.data?.error || loginErrors.response.data?.message}
        </Alert>
      )}
    </Box>
  );
};

export default Login;
