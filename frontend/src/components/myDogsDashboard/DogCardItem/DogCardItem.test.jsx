// Test: Test file for DogCardItem component
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DogCardItem from './DogCardItem';

// Mock the DogCreateUpdateDialog component
jest.mock('../../myDogsDashboard/DogCreateUpdateDialog', () => {
  const DogCreateUpdateDialog = () => <div>DogCreateUpdateDialogComponent</div>;
  DogCreateUpdateDialog.displayName = 'DogCreateUpdateDialog';
  return DogCreateUpdateDialog;
});

describe('DogCardItem', () => {
  const dogProps = {
    id: '1',
    image: 'dog.jpg',
    name: 'Buddy',
    gender: 'Male',
    aboutMe: 'Friendly dog'
  };

  it('renders without crashing', () => {
    render(<DogCardItem {...dogProps} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Friendly dog')).toBeInTheDocument();
    expect(screen.getByAltText('1')).toBeInTheDocument();
  });

  it('renders the view profile button', () => {
    render(<DogCardItem {...dogProps} />, { wrapper: MemoryRouter });
    expect(screen.getByText('View Profile')).toBeInTheDocument();
  });
});
