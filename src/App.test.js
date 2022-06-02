import { render, screen } from '@testing-library/react';
import App from './App';

test('check for text when loading book', () => {
  render(<App />);
  const title = screen.getByText(/loading the books/i);
  expect(title).toBeInTheDocument();
});
