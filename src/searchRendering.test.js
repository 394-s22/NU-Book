import { render, screen } from '@testing-library/react';
import {Form} from './components/ListForm.js'
import {Departments} from './components/Departments.js'
import { useData, useUserState }from './utilities/firebase.js';
import userEvent from '@testing-library/user-event';
import App from './App';

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

//DAVID SOTIR
const mockData = {
    "book-sales": {
      "fakeBook": {
        "ISBN": "7777",
        "class-number": "223",
        "department": "SPANISH",
        "edition": "7",
        "email": "dummy@gmail.com",
        "price": "24",
        "quality": "Excellent",
        "seller-name": "dummy",
        "seller-phone": "31231231231",
        "title": "FakeBook"
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

test('search book form renders', async () => {
  useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
  render(<App/>)
  await new Promise((r) => setTimeout(r, 500));

  const search = screen.getByText(/Search Books/i)
  userEvent.click(search)
  const less = screen.getByPlaceholderText(/Price: less than/i);
  expect(less).toBeVisible();
  });
