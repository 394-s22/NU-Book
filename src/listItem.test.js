import { listItemIconClasses } from '@mui/material';
import { render, screen } from '@testing-library/react';
import {Form} from './components/ListForm.js'
import { useData, useUserState }from './utilities/firebase.js';
import App from './App';
import userEvent from '@testing-library/user-event';

// Robin Li
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

const mockData = {
  "book-sales": {
    "fakeBook": {
      "ISBN": "test_string",
      "class-number": "test_string",
      "department": "TEST",
      "edition": "test_string",
      "email": "dummy@gmail.com",
      "price": "test_string",
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
          "class-number": "test_string",
          "department": "Department",
          "edition": "test_string",
          "email": "test_string",
          "price": "test_string",
          "quality": "test_string",
          "seller-name": "test_string",
          "seller-phone": "test_string",
          "title": "test_string",
          "url": "test_string"
        }},
      "email": "dummy@gmail.com",
      "userName": "dummy"
    }
    
  }
}


test('Test list function with digital input replaced by string', async () => {
  
  useUserState.mockReturnValue([{ displayName: 'User with string input' }, false, null]);
  
  render(<App />);

  await new Promise((r) => setTimeout(r, 500));
  const list = screen.getByText(/List a Book/i)
  expect(list).toBeInTheDocument()
  userEvent.click(list)
  const submitbutton = screen.getByText(/Submit/i)
  expect(()=> userEvent.click(submitbutton)).toThrowError;

});
