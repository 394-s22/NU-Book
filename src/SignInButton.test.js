//Author: Alison 
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


test('check when click submit with empty form return to original page', async () => {
    useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const searchbutt = screen.getByText(/Search Books/i);
    userEvent.click(searchbutt);
    const submitbutt = screen.getByText(/Submit/i);
    expect(submitbutt).toBeInTheDocument();
    userEvent.click(submitbutt);
    const don = screen.getByText(/Don Quixote/i);
    const geo = screen.getByText(/Geometry Fundamentals/i);
    const math = screen.getByText(/Math Proofs/i);
    const art = screen.getByText(/An Art History Guide/i);
    const bio = screen.getByText(/Biology/i);
    expect(don).toBeInTheDocument();
    expect(geo).toBeInTheDocument();
    expect(math).toBeInTheDocument();
    expect(art).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
    const listButton = screen.getByText(/List a Book/i);
    const search = screen.getByText(/Search Books/i);
    expect(listButton).toBeInTheDocument();
    expect(search).toBeInTheDocument();

  });

  test('List a Book Error ', async () => {
    useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const ListtButt = screen.getByText(/List a Book/i);
    expect(ListtButt).toBeInTheDocument();
    expect(()=> userEvent.click(ListtButt)).toThrowError;

  });
  