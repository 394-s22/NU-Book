import { render, screen } from '@testing-library/react';
import App from './App';

test('check for retrieving data from firebase', async () => {
  render(<App />);
  
  await new Promise((r) => setTimeout(r, 500));
  const imgs = screen.getAllByAltText(/book-preview/i);
  imgs.map(img => expect(img).toBeInTheDocument());
});
