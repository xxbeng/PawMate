// Code to customize the theme of the Material-UI components
import { createTheme } from '@mui/material/styles';

// Create a custom theme for the Material-UI components
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6' // Custom primary color
    },
    secondary: {
      main: '#19857b' // Custom secondary color
    },
    // You can also customize error, warning, info, and success colors
    error: {
      main: '#ff1744'
    }
    // Add other colors as needed
  }
});

export default theme;
