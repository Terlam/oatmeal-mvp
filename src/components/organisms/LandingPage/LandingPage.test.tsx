import { render, screen } from '@testing-library/react';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders with placeholder text', () => {
    render(<LandingPage />);
    expect(screen.getByText('LandingPage placeholder')).toBeInTheDocument();
  });
});
