// Author: Sydney Smith
// I also wrote another test in UserLogin.test.js

import { render, screen } from '@testing-library/react';
import App from './App';
import { useData, useUserState }from './utilities/firebase.js';

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

  test('check that filtering by price works in search', async () => {
    useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const searchButton = screen.getByText(/Search Books/i);
    userEvent.click(searchButton);
    const submit = screen.getByText(/submit/i);
    expect(submit).toBeInTheDocument();
    const priceInput = screen.getByTestId("price-test");
    userEvent.type(priceInput, "30");
    userEvent.click(submit);
    // books with price <= $30 should be there
    const spanishBook = screen.getByText(/Don Quixote/i);
    expect(spanishBook).toBeInTheDocument();
    const geometryBook = screen.getByText(/Geometry Fundamentals/i);
    expect(geometryBook).toBeInTheDocument();
    // books with price > $30 should not be there
    const artBook = screen.queryByText(/An Art History Guide/i);
    expect(artBook).not.toBeInTheDocument();
  });