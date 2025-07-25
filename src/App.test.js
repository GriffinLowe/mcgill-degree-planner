import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation buttons', () => {
  render(<App />);
  const linkElement = screen.getByText(/Explore Programs/i);
  expect(linkElement).toBeInTheDocument();
});
