// Test: Filter Component
/* eslint-disable */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter Component', () => {
  // mock function to pass as prop
  const mockSetTinderFilters = jest.fn();

  beforeEach(() => {
    render(<Filter setTinderFilters={mockSetTinderFilters} />);
  });

  // manual match button should be rendered
  test('should switch to manual match when the manual match button is clicked', () => {
    const manualMatchButton = screen.getByRole('button', { name: 'Manual Match' });
    fireEvent.click(manualMatchButton);
    expect(screen.getByText('Manual Match')).toBeInTheDocument();
  });

  // auto match button should be rendered after manual match button is clicked
  test('should render filter button after manual match button is clicked', () => {
    const manualMatchButton = screen.getByRole('button', { name: 'Manual Match' });
    fireEvent.click(manualMatchButton);
    expect(screen.getByText('Manual Match')).toBeInTheDocument();

    const autoMatchButton = screen.getByRole('button', { name: 'Auto Match' });
    expect(autoMatchButton).toBeInTheDocument();
  });

  // should switch to auto match when clicked
  test('should switch to auto match when the auto match button is clicked', () => {
    const manualMatchButton = screen.getByRole('button', { name: 'Manual Match' });
    fireEvent.click(manualMatchButton);
    expect(screen.getByText('Manual Match')).toBeInTheDocument();

    const autoMatchButton = screen.getByRole('button', { name: 'Auto Match' });
    fireEvent.click(autoMatchButton);
    expect(screen.getByText('Auto Match')).toBeInTheDocument();
  });

  // filter button should be rendered after manual match button is clicked
  test('should render filter button after manual match button is clicked', () => {
    const manualMatchButton = screen.getByRole('button', { name: 'Manual Match' });
    fireEvent.click(manualMatchButton);
    expect(screen.getByText('Manual Match')).toBeInTheDocument();

    const filterButton = screen.getByRole('button', { name: 'Filter' });
    expect(filterButton).toBeInTheDocument();
  });

  // should call setTinderFilters when filter button is clicked
  test('should call setTinderFilters when filter button is clicked', () => {
    const manualMatchButton = screen.getByRole('button', { name: 'Manual Match' });
    fireEvent.click(manualMatchButton);
    expect(screen.getByText('Manual Match')).toBeInTheDocument();

    const filterButton = screen.getByRole('button', { name: 'Filter' });
    fireEvent.click(filterButton);
    expect(mockSetTinderFilters).toHaveBeenCalled();
  });
});
