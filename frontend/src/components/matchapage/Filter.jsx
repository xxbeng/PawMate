// Filter component to handle the filter options for the Tinder page
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import {
  Box,
  FormControlLabel,
  Button,
  Autocomplete,
  TextField,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { dogBreeds } from '../../data/dogBreeds';
// Define the initial state of the filter
const filterInitialState = {
  manualMatch: false,
  breeds: [],
  gender: 'all',
  age: {
    min: 0,
    max: 100
  },
  neutered: 'all'
};

const Filter = ({ setTinderFilters, toggleFilter }) => {
  const [filters, setFilters] = useState(filterInitialState);
  const handleChange = (prop) => (event) => {
    setFilters({ ...filters, age: { ...filters.age, [prop]: event.target.value } });
  }; // Define the functions to handle the form submission and radio button changes

  const handleSubmit = () => {
    setTinderFilters(filters, { manualMatch: true });
  }; // Define the functions to handle the auto and manual match buttons
  const handleAutoMatch = () => {
    setFilters(() => {
      const newFilters = { ...filterInitialState, manualMatch: false };
      setTinderFilters(newFilters);
      return newFilters;
    });
  }; // Define the functions to handle the manual match button
  const handleManualMatch = () => {
    setFilters(() => {
      const newFilters = { ...filterInitialState, manualMatch: true };
      setTinderFilters(newFilters);
      return newFilters;
    });
  }; // Define the function to handle the radio button changes

  const handleRadioChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  }; // Render the filter component

  return (
    <>
      {open && (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            left: 0,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            backgroundColor: 'white',
            padding: '16px',
            '@media (min-width: 600px)': {
              width: '25%' // On larger screens, set the width to 25%
            },
            zIndex: 1000
          }}
        >
          <IconButton
            onClick={toggleFilter}
            color="primary"
            data-testid="filter-toggle-button"
            sx={{
              zIndex: 1100
            }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <Typography variant="h5">
            {(filters.manualMatch && 'Manual Match') || 'Auto Match'}
          </Typography>
          <Typography variant="div" sx={{ mt: 2 }}>
            {filters.manualMatch ? (
              <Typography variant="span">
                Prefer a more hands-on approach? Select Manual Match to personally filter and select
                potential mates based on specific criteria that you value. This option gives you the
                flexibility to fine-tune the search based on your preferences.
              </Typography>
            ) : (
              <Typography variant="span">
                Our system automatically finds potential mates whose profiles closely align with
                your dog’s characteristics. This option is designed for effortless matches, ensuring
                compatibility based on our comprehensive profile analysis.
              </Typography>
            )}
          </Typography>
          {filters.manualMatch && (
            <>
              <Box>
                <FormControl fullWidth>
                  <FormLabel>Dog Breeds</FormLabel>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={dogBreeds}
                    onChange={(_, breeds) => setFilters({ ...filters, breeds })}
                    filterSelectedOptions
                    value={filters.breeds}
                    renderInput={(params) => (
                      <TextField {...params} label="Filter Breeds" placeholder="Breeds" />
                    )}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => {
                        const { key, ...restProps } = getTagProps({ index });
                        return <Chip {...restProps} key={option + '-' + key} label={option} />;
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={filters.gender}
                    onChange={(event) => handleRadioChange('gender', event.target.value)}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <TextField
                      label="Min Age"
                      variant="outlined"
                      type="number"
                      value={filters.age.min}
                      onChange={handleChange('min')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: enhances mobile usability
                    />
                    <TextField
                      label="Max Age"
                      variant="outlined"
                      type="number"
                      value={filters.age.max}
                      onChange={handleChange('max')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: enhances mobile usability
                    />
                  </Box>
                </FormControl>
              </Box>
              <Divider />
              <FormControl>
                <FormLabel>Neutered</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={filters.neutered}
                  onChange={(event) => handleRadioChange('neutered', event.target.value)}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                  <FormControlLabel value="all" control={<Radio />} label="All" />
                </RadioGroup>
              </FormControl>
              <Divider />
            </>
          )}
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {filters.manualMatch && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={filters === filterInitialState}
              >
                Filter
              </Button>
            )}
            {!filters.manualMatch && (
              <Button variant="contained" color="primary" onClick={handleManualMatch}>
                Manual Match
              </Button>
            )}
            {filters.manualMatch && (
              <Button variant="contained" color="primary" onClick={handleAutoMatch}>
                Auto Match
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

Filter.propTypes = {
  setTinderFilters: PropTypes.func,
  toggleFilter: PropTypes.func // Validate toggleFilter as a function
};

export default Filter;
