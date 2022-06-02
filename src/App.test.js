import { render, screen } from '@testing-library/react';
import App from './App';

test('check for text NU Book', () => {
  render(<App />);
  const title = screen.getByText(/book/i);
  expect(title).toBeInTheDocument();
});
