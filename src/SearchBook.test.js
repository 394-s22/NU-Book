//Author: David Cheung
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

test('Search page loads', async () => {
    useUserState.mockReturnValue([{ displayName: "Test User" }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const sbutt = screen.getByText(/Search Book/i);
    userEvent.click(sbutt);
    const btn = screen.getByText(/Submit/i);
    expect(btn).toBeInTheDocument();
  });

  test('Search page load error', async () => {
    useUserState.mockReturnValue([{ displayName: "Test User" }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const sbutt = screen.getByText(/Search Book/i);
    userEvent.click(sbutt);
    expect(screen.queryByText(/Search Book/i)).toBeNull;
  });