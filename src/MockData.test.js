import { render, screen } from '@testing-library/react';
import App from './App';
import Title from './components/Title.js';

import { useData, useUserState }from './utilities/firebase.js';


// Author: Lingyue Chu
jest.mock('./utilities/firebase.js', () => {
  const originalB = jest.requireActual('./utilities/firebase.js');
  const partialMockedB = Object.keys(originalB).reduce((pre, methodName) => {
    pre[methodName] = jest.fn();
    return pre;
  }, {});
  return {
    ...partialMockedB,
    useUserState: originalB.useUserState,
    storage: originalB.storage // mock all methods of b except method3
  };
});

const mockData = {
  "book-sales": {
    "fakeBook": {
      "ISBN": "7777",
      "class-number": "1",
      "department": "TEST",
      "edition": "7",
      "email": "dummy@gmail.com",
      "price": "77.77",
      "quality": "TEST",
      "seller-name": "Test user",
      "seller-phone": "31231231231",
      "title": "Fake Book"
    }
  },
  "users": {
    "jih7m8yBDccsjfMO1DpOaVIkIUAR": {
      "books": {"0":0,
        "fakeBook": {
          "ISBN": "2",
          "class-number": "2",
          "department": "Department",
          "edition": "2",
          "email": "2",
          "price": "2",
          "quality": "2",
          "seller-name": "2",
          "seller-phone": "2",
          "title": "2",
          "url": "2"
        }},
      "email": "dummy@gmail.com",
      "userName": "dummy"
    }
    
  }
}


test('Mock data test', async () => {
  
  useData.mockReturnValue([mockData, false, null]);
  //useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);

  render(<App />);
  await new Promise((r) => setTimeout(r, 500));
  const fakeEmail = screen.getByText(/dummy@gmail.com/i);
  expect(fakeEmail).toBeVisible();
});

