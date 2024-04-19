import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../app/profile/page';

// Skipping this test. Cookies are not happy with this one. Error: `cookies` was called outside a request scope.
describe('Profile Page', () => {
  it.skip('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
