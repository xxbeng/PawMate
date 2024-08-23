// Test: DogDashboard Component
import { render, screen } from '@testing-library/react';
import React from 'react';
import DogDashboard from './DogDashboard';

// Mock the child components and assign display names
jest.mock('../DogCards', () => {
  const DogCards = () => <div>DogCards Component</div>;
  DogCards.displayName = 'DogCards';
  return DogCards;
});

jest.mock('../DogCreateUpdateDialog', () => {
  const DogCreateUpdateDialog = () => <div>Dog Create Update Dialog</div>;
  DogCreateUpdateDialog.displayName = 'DogCreateUpdateDialog';
  return DogCreateUpdateDialog;
});

describe('DogDashboard', () => {
  it('renders the dashboard and checks for main elements', () => {
    render(<DogDashboard />);

    // Check for the header text
    expect(screen.getByText('My Dog Dashboard')).toBeInTheDocument();

    // Check if the DogCreateUpdateDialog component is rendered
    expect(screen.getByText('Dog Create Update Dialog')).toBeInTheDocument();

    // Check if the DogCards component is rendered
    expect(screen.getByText('DogCards Component')).toBeInTheDocument();
  });
});
