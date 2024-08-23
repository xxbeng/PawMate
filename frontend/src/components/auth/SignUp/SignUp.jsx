// SignUp component to register a new user
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Alert,
  CircularProgress,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { APPLICATION_PATH } from '../../../utils/urlRoutes';
import { CommonStyles } from '../../common/CommonStyles';
import UserFormBase from '../../UserFormBase';
import { signupSchema } from './SignUp.validation';

// Default values for the form fields
const defaultValues = {
  aboutMe: '',
  username: '',
  address: '',
  phone: '',
  password: '',
  confirmPassword: '',
  email: '',
  latitude: '',
  longitude: ''
};

// SignUp component to register a new user
const SignUp = () => {
  const { signup, signupErrors, isPendingSignup, isSignup, setIsSignup } = useAuth();
  let navigate = useNavigate();

  const { control, handleSubmit, reset, setValue, setError } = useForm({
    defaultValues,
    resolver: joiResolver(signupSchema, {
      abortEarly: false,
      stripUnknown: true
    })
  });

  // Redirect to the dashboard if the user is authenticated after signup
  useEffect(() => {
    const serverErrors = signupErrors?.response?.data?.fields;
    if (serverErrors) {
      Object.keys(serverErrors).forEach((fieldName) => {
        setError(fieldName, {
          type: 'server',
          message: serverErrors[fieldName]
        });
      });
    }
  }, [signupErrors, setError]);
  // Reset the form and close the dialog
  const handleDialogClose = () => {
    setIsSignup(false);
    reset();
  };

  // Navigate to the login page
  const handleDialogButtonClick = () => {
    handleDialogClose();
    navigate(APPLICATION_PATH.auth.login);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(signup)}
      noValidate
      autoComplete="off"
      sx={CommonStyles.formContainer}
    >
      <Box sx={CommonStyles.formHeader}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup Form
        </Typography>
        <Typography variant="subtitle" component="p">
          Please fill out the form to register.
        </Typography>
      </Box>

      <UserFormBase
        isPendingSignup={isPendingSignup}
        control={control}
        setValue={setValue}
        handleLoginClick={() => navigate(APPLICATION_PATH.auth.login)}
      />
      {isPendingSignup && <CircularProgress size={24} sx={CommonStyles.progressIndicator} />}
      {signupErrors && (
        <Alert severity="error" sx={CommonStyles.alert}>
          Failed to register:{' '}
          {signupErrors?.response?.data?.error || signupErrors.response.data?.message}
        </Alert>
      )}
      <Dialog
        open={isSignup}
        onClose={() => handleDialogClose()}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title" sx={CommonStyles.dialogTitle}>
          Registration is Successful!
        </DialogTitle>
        <DialogContent sx={CommonStyles.dialogContent}>
          <DialogContentText id="success-dialog-description" sx={CommonStyles.dialogContentText}>
            Your account has been successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={CommonStyles.dialogAction}>
          <Button
            onClick={() => handleDialogButtonClick()} // Navigate to the login page
            variant="contained"
            color="success"
            sx={CommonStyles.dialogButton}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUp;
