// Test: DogFormBase Component
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import DogFormBase from './DogFormBase';

// Mock props
const mockHandleImageChange = jest.fn();

// Helper component to wrap DogFormBase with react-hook-form
function DogFormBaseWrapper({ isLoading }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <DogFormBase
        control={methods.control}
        handleImageChange={mockHandleImageChange}
        isLoading={isLoading}
      />
    </FormProvider>
  );
}

// Prop types validation
DogFormBaseWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

// Test suite for the DogFormBase component
describe('DogFormBase', () => {
  it('renders all fields correctly and can interact with the file input', () => {
    render(<DogFormBaseWrapper isLoading={false} />);

    // Check for all fields to be present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Breed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Neutered/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Dog Photo/i)).toBeInTheDocument();

    // Simulate file upload
    const fileInput = screen.getByLabelText(/Upload Dog Photo/i);
    userEvent.upload(fileInput, new File(['(⌐□_□)'], 'dog.png', { type: 'image/png' }));

    // Check if the handler was called
    expect(mockHandleImageChange).toHaveBeenCalled();
  });
});
