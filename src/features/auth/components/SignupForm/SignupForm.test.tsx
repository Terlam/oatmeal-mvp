import { render, screen } from '@testing-library/react';
import { SignupForm } from './SignupForm';

describe('SignupForm', () => {
  it('renders with placeholder text', () => {
    render(<SignupForm />);
    expect(screen.getByText('SignupForm placeholder')).toBeInTheDocument();
  });
});
