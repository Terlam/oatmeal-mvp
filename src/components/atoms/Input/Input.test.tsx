import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with placeholder text', () => {
    render(<Input />);
    expect(screen.getByText('Input placeholder')).toBeInTheDocument();
  });
});
