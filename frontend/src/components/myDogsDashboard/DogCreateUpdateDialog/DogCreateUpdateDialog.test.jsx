// Test: DogCreateUpdateDialog Component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DogCreateUpdateDialog from './DogCreateUpdateDialog';

const queryClient = new QueryClient();

// Wrapper component to provide the QueryClient and ReactQueryDevtools to the component
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// Test suite for the DogCreateUpdateDialog component
describe('DogCreateUpdateDialog', () => {
  it('renders without crashing', () => {
    render(<DogCreateUpdateDialog />, { wrapper });
    expect(screen.getByText(/Add Dog/i)).toBeInTheDocument();
  });

  it('opens and closes the dialog when clicking chip and cancel buttons', async () => {
    render(<DogCreateUpdateDialog />, { wrapper });
    fireEvent.click(screen.getByText(/Add Dog/i));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    fireEvent.click(screen.getByText(/Cancel/i));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
