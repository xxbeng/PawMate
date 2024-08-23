// Test: check if the NoDogFound component renders without crashing
import { render, screen } from '@testing-library/react';
import React from 'react';
import NoDogFound from './NoDogFound';

describe('NoDogsFound', () => {
  it('renders without crashing', () => {
    render(<NoDogFound />);
    const heading = screen.getByText('No dogs found');
    const message = screen.getByText("Looks like you haven't created any dogs yet.");

    // Check if the texts are rendered
    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
