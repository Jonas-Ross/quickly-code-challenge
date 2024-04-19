import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../app/401/page';

describe('401 Page', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
  });
});
