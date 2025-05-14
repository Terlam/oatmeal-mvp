import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with placeholder text', () => {
    render(<EmptyState />);
    expect(screen.getByText('EmptyState placeholder')).toBeInTheDocument();
  });
});
