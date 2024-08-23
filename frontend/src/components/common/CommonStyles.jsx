// common styles for the application
export const CommonStyles = {
  loginHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2
  },
  loginHeaderImage: {
    width: 60,
    height: 60,
    mr: 1
  },
  loginHeaderText: {
    fontWeight: 'bold',
    color: '#333',
    mt: 2
  },
  loginFormContainer: {
    maxWidth: '600px',
    my: 10
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    minHeight: '55vh',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    width: '75%',
    mx: 'auto',
    my: 1
  },
  formHeader: {
    textAlign: 'center',
    p: 2
  },
  autoCompleteBox: {
    mb: 1,
    mt: 2
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    px: 2,
    mt: 2,
    mb: 3
  },
  actionButton: {
    flexGrow: 1,
    height: 56,
    mx: 1,
    borderRadius: '15px'
  },
  progressIndicator: {
    display: 'block',
    margin: '10px auto'
  },
  alert: {
    mt: 2,
    width: '100%'
  },
  dialogTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'primary.main',
    color: 'common.white',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    padding: 2
  },
  dialogContent: { pt: 2, pb: 3, px: 3, textAlign: 'center' },
  dialogContentText: { mt: 4, fontWeight: 'bold' },
  dialogAction: { flexDirection: 'column', p: 1 },
  dialogButton: {
    padding: '10px 20px',
    mb: 2,
    ':hover': {
      backgroundColor: 'primary.dark' // Darker color on hover
    }
  },
  homeContainerStyles: {
    backgroundColor: '#aad5dc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  },
  homeBoxStyles: {
    position: 'absolute',
    top: 100,
    left: 50,
    textAlign: 'center',
    zIndex: 2
  },
  homeTypographyStyles: {
    color: '#1a4c88',
    fontWeight: 'bold'
  },
  homeSubtitleStyles: {
    m: 2,
    alignSelf: 'center',
    color: '#1a4c88'
  },
  homeButtonStyles: {
    m: 1,
    padding: '10px 20px',
    backgroundColor: '#1a4c88'
  },
  matchDashboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px'
  },
  matchCardFront: {
    borderRadius: '20px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
    marginTop: '-20vh',
    overflow: 'hidden',
    overflowY: 'auto',
    width: {
      xs: '300px',
      sm: '500px',
      md: '600px',
      lg: '700px'
    },
    height: {
      xs: '500px',
      sm: '500px',
      md: '500px',
      lg: '500px'
    }
  },
  matchCardBack: {
    borderRadius: '20px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#aad5dc',
    color: 'black',
    textAlign: 'center',
    marginTop: '-20vh',
    overflow: 'hidden',
    overflowY: 'auto',
    width: {
      xs: '400px',
      sm: '500px',
      md: '600px',
      lg: '700px'
    },
    height: {
      xs: '500px',
      sm: '500px',
      md: '500px',
      lg: '500px'
    }
  },
  matchName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '28px',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  },
  matchNameBack: {
    fontWeight: 'bold',
    color: 'Black',
    fontSize: '18px',
    marginBottom: '5px'
  },
  matchBreed: {
    fontSize: '18px',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
  },
  matchBreedBack: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '5px'
  },
  matchInfo: {
    fontSize: '16px',
    opacity: 0.8,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
  },
  matchWeightBack: {
    fontWeight: 'bold',
    fontSize: '18px',
    opacity: 0.8,
    marginBottom: '5px'
  },
  matchBirthBack: {
    fontWeight: 'bold',
    fontSize: '18px',
    opacity: 0.8,
    marginBottom: '5px'
  },
  matchBio: {
    fontWeight: 'bold',
    fontSize: '18px',
    opacity: 0.8,
    marginBottom: '5px',
    width: '400px'
  },
  matchButton: {
    backgroundColor: '#aad5dc',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '20px',
    minWidth: '150px',
    '&:hover': {
      backgroundColor: '#1a4c88'
    }
  },
  chipButton: {
    padding: '6px 12px',
    mr: 1,
    backgroundColor: '#f5f5f5',
    color: '#3296fa',
    height: '36px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    borderRadius: '13px',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    '&:focus': {
      backgroundColor: '#e0e0e0',
      boxShadow: '0 0 0 2px #4da6ff',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
    }
  },
  dogDashboardCard: {
    maxWidth: 330,
    m: 1,
    mt: 2,
    boxShadow: 3,
    width: 350,
    height: 500,
    borderRadius: 2,
    backgroundColor: '#fafcfd'
  }
};
