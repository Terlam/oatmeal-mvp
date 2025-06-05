import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders with placeholder text', () => {
    render(<Card />);
    expect(screen.getByText('Card placeholder')).toBeInTheDocument();
  });
});
