import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../app/signup/page';

// Mock for useFormState
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [() => {}, null],
}));
describe('Signup Page', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
