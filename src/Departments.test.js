import { render, screen } from '@testing-library/react';
import {Form} from './components/ListForm.js'
import {Departments} from './components/Departments.js'

import { useData, useUserState }from './utilities/firebase.js';

jest.mock('./utilities/firebase.js');
jest.mock('./components/Departments.js');


const departmentData = [ <option value="Test_DEPT">Test_DEPT</option> ]
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


test('Form populates with departments ', async () => {
  
  useData.mockReturnValue([mockData, false, null]);
  useUserState.mockReturnValue([{ displayName: 'Test user' }, false, null]);
  Departments.mockReturnValue([departmentData, false, null])
  render(<Form visibility={true}/>)
  await new Promise((r) => setTimeout(r, 500));
  const testOption = screen.getByText(/test_DEPT/i);
  expect(testOption).toBeVisible();
});





