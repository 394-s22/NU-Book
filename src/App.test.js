import { render, screen } from '@testing-library/react';
import App from './App';
import { useData, useUserState }from './utilities/firebase.js';

// Author: Lingyue Chu
test('check for text when loading book', () => {
  render(<App />);
  const title = screen.getByText(/loading the books/i);
  expect(title).toBeInTheDocument();
});

// Author: Lingyue Chu
import userEvent from '@testing-library/user-event';
jest.mock('./utilities/firebase.js', () => {
  const originalB = jest.requireActual('./utilities/firebase.js');
  const partialMockedB = Object.keys(originalB).reduce((pre, methodName) => {
    pre[methodName] = jest.fn();
    return pre;
  }, {});
  return {
    ...partialMockedB,
    useData: originalB.useData,
    storage: originalB.storage // mock all methods of b except method3
  };
});
test('check there is a back button when click List a book after sign in', async () => {
  
  useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
  render(<App />);

  await new Promise((r) => setTimeout(r, 500));
  const listBookButton = screen.getByText(/List a Book/i);
  userEvent.click(listBookButton);
  const backButton = screen.getByText(/X/i);
  expect(backButton).toBeInTheDocument();
});


// Author: Lingyue Chu
test('check the back buttons can return to the home page', async () => {

  useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
  render(<App />);

  await new Promise((r) => setTimeout(r, 500));
  const listBookButton = screen.getByText(/List a Book/i);
  userEvent.click(listBookButton);

  const backButtonList = screen.getByText(/X/i);
  userEvent.click(backButtonList);

  const searchButton = screen.getByText(/Search Books/i);
  userEvent.click(searchButton);
  
  const backButtonSearch = screen.getByText(/X/i);
  userEvent.click(backButtonSearch);

  const listButton = screen.getByText(/List a Book/i);
  const search = screen.getByText(/List a Book/i);
  expect(listButton).toBeInTheDocument();
  expect(search).toBeInTheDocument();
});
