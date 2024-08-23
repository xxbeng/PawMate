// Test: UserFormBase Component
/* eslint-disable */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import UserFormBase from './UserFormBase';

// Helper component to wrap UserFormBase with react-hook-form
function UserFormBaseWrapper({ isPendingSignup }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <UserFormBase
        control={methods.control}
        setValue={methods.setValue}
        handleLoginClick={() => {}}
        isPendingSignup={isPendingSignup}
      />
    </FormProvider>
  );
}

UserFormBaseWrapper.propTypes = {
  isPendingSignup: PropTypes.bool.isRequired
};

describe('UserFormBase', () => {
  it('renders all fields correctly and interacts with the form', () => {
    render(<UserFormBaseWrapper isPendingSignup={false} />);

    // Check for input fields to be present
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const phoneInput = screen.getByLabelText(/Phone/i);

    // Simulate user typing into the fields
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(phoneInput, '1234567890');

    // Check values have been updated
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(phoneInput).toHaveValue('1234567890');

    // Interact with buttons
    const registerButton = screen.getByRole('button', { name: /Register/i });
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Simulate button clicks
    userEvent.click(loginButton);

    // Verify state and interactions
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
