import { render, screen } from '@testing-library/react';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  it('renders with placeholder text', () => {
    render(<FileInput />);
    expect(screen.getByText('FileInput placeholder')).toBeInTheDocument();
  });
});
