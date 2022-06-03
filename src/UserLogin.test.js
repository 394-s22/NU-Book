import { render, screen } from '@testing-library/react';
import App from './App';
import Title from './components/Title.js';

import { useData, useUserState }from './utilities/firebase.js';

// Author: Lingyue Chu
jest.mock('./utilities/firebase.js');

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


test('check for sign out button when login ', async () => {
  
  useData.mockReturnValue([mockData, false, null]);
  useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);

  render(<Title />);
  await new Promise((r) => setTimeout(r, 500));
  const button = screen.getByText(/sign out/i);
  expect(button).toBeVisible();
});

