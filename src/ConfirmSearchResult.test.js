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


test('check search book return the right results', async () => {
    useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
    render(<App />);
    await new Promise((r) => setTimeout(r, 500));
    const searchbutt = screen.getByText(/Search Books/i);
    userEvent.click(searchbutt);
    const submit = screen.getByText(/submit/i);
    expect(submit).toBeInTheDocument();
    const input = screen.getByTestId("test");
    userEvent.type(input, "Math");
    userEvent.click(submit);
    const math = screen.getByText(/Math Proofs/i);
    expect(math).toBeInTheDocument();
  });

  