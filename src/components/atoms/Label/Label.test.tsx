import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders with placeholder text', () => {
    render(<Label />);
    expect(screen.getByText('Label placeholder')).toBeInTheDocument();
  });
});
