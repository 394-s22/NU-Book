import { render, screen } from '@testing-library/react';
import App from './App';

test('check for text book', () => {
  render(<App />);
  const title = screen.getByText(/book/i);
  expect(title).toBeInTheDocument();
});
