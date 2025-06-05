import { render, screen } from '@testing-library/react';
import { ProfileForm } from './ProfileForm';

describe('ProfileForm', () => {
  it('renders with placeholder text', () => {
    render(<ProfileForm />);
    expect(screen.getByText('ProfileForm placeholder')).toBeInTheDocument();
  });
});
