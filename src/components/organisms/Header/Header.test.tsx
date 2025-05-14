import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders with placeholder text', () => {
    render(<Header isLoggedIn />);
    expect(screen.getByText('Header placeholder'));
  });
});
