// Header component for the application, displays the navigation links and user menu
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  ListItemIcon
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userDataStorage } from '../../utils/localStorageNames';
import { APPLICATION_PATH } from '../../utils/urlRoutes';

// Define the pages that will be displayed in the header
const pages = {
  home: {
    text: 'Home',
    url: APPLICATION_PATH.dashboard
  },
  myDogs: {
    text: 'My Dogs',
    url: APPLICATION_PATH.dog.dashboard
  },
  friends: {
    text: 'Friends',
    url: APPLICATION_PATH.user.friends
  },
  matching: {
    text: 'Matching',
    url: APPLICATION_PATH.matching
  }
};

function Header() {
  // Set the anchor element for the navigation menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // Get the authentication status and logout function from the AuthContext
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  // Define the functions to open and close the navigation and user menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // Define the functions to open and close the user menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // Define the functions to close the navigation and user menus
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // Define the functions to close the user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Define the function to handle the user menu
  const handleUserMenu = (setting) => () => {
    switch (setting) {
      case 'Logout':
        if (isAuthenticated) {
          handleLogout();
        }
        break;
      case 'Logo':
        navigate(APPLICATION_PATH.homepage); // Redirect to the homepage when clicking logo
        break;
      case 'Account':
        if (isAuthenticated) {
          navigate(APPLICATION_PATH.user.profile); // Redirect to the user profile when clicking account
        }
        break;
      default:
        navigate('/');
    }
    handleCloseUserMenu();
  };
  // Define the function to handle the logout
  const handleLogout = () => {
    logout();
    navigate(APPLICATION_PATH.homepage);
  };
  // Define the function to get the initials of the user
  const getInitials = (name) => {
    if (!name) {
      return '';
    }
    const names = name.split(' ');
    let initials = '';
    names.forEach((n) => {
      initials += n.charAt(0);
    });
    return initials.toUpperCase();
  };
  // Get the user data from the local storage
  const userData = userDataStorage.get();
  const initials = userData ? getInitials(userData.username) : '';
  const username = userData ? userData.username : '';
  // If the user is not authenticated, do not display the header
  if (!isAuthenticated) {
    return null;
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: '#aad5dc' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <Avatar variant="square" src="./logo.png" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {Object.entries(pages).map(([key, { text, url }]) => (
                <MenuItem
                  key={key}
                  onClick={() => {
                    navigate(url);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.entries(pages).map(([key, { text, url }]) => (
              <Button
                key={key}
                onClick={() => {
                  navigate(url);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '0 10px' }}>Welcome, {username}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userData ? (
                    <Tooltip title={userData.name}>
                      <Avatar>{initials}</Avatar>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Default User">
                      <Avatar>
                        <PermIdentityOutlinedIcon />
                      </Avatar>
                    </Tooltip>
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Account" onClick={handleUserMenu('Account')}>
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleUserMenu('Logout')}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
