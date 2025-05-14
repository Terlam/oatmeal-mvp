import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders with placeholder text', () => {
    render(<UserCard />);
    expect(screen.getByText('UserCard placeholder'));
  });
});
