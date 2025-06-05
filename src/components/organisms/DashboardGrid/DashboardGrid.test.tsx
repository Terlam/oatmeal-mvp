import { render, screen } from '@testing-library/react';
import { DashboardGrid } from './DashboardGrid';

describe('DashboardGrid', () => {
  it('renders with placeholder text', () => {
    render(<DashboardGrid />);
    expect(screen.getByText('DashboardGrid placeholder')).toBeInTheDocument();
  });
});
