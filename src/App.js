import './App.css';
import React, {useState} from "react";
import { useData, setData, addData, useUserState, test_user, delete_book } from './utilities/firebase.js';
import Title from './components/Title.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from './components/ListForm.js';
import Books from './components/Books';

const postData = (handleClick) => {
  const bookForm = document.getElementById("list-form");
  const formResults = {
    "title": bookForm.elements["title"].value,
    "edition": bookForm.elements["edition"].value,
    "url": bookForm.elements["url"].value,
    "department": bookForm.elements["department"].value,
    "class-number": bookForm.elements["class-number"].value,
    "seller-name": bookForm.elements["seller-name"].value,
    "seller-phone": bookForm.elements["seller-phone"].value,
    "price": bookForm.elements["price"].value,
    "quality": bookForm.elements["quality"].value,
    "ISBN": bookForm.elements["ISBN"].value,
    "email": bookForm.elements["email"].value
    };
  if(!formResults["title"] || !formResults["department"] || !formResults["class-number"] || !formResults["price"] || !formResults["quality"]) {
    alert("Title, Department, Class number, Price, and Quality are required inputs.");
  }
  else {
    addBook(formResults);
    handleClick()
  }
}

const Body = (props) => {
  // bookVisibility is if the books are visible
  // if books are visible, form is not visible
  // formVisibility = !bookVisibility
  const [bookVisibility, setBookVisibility] = useState(true);
  const [searchVisibility, setSearchVisibility] = useState(false);
  // how to pass state down to children?

  const handleClick = () => {
    setBookVisibility(!bookVisibility)
  }
  // pass down handleClick function
  
  const handleClickSearch = () => {
    setBookVisibility(!bookVisibility)
    setSearchVisibility(!searchVisibility)
  }

  return (
    <div>
      <Form handleClick={handleClick} visibility = {!bookVisibility} handleClickSearch = {handleClickSearch} searchVisibility={searchVisibility} postData={postData} data = {props.data}/>
      {/* <SearchForm handleClick={handleClickSearch} visibility={!bookVisibility} postData={postData}/> */}
      <Books visibility={bookVisibility && !searchVisibility} searchVisibility={searchVisibility}/>
    </div>
  )
}

// // Update Functions (more to come)
// // currently it only updates the first book
// const rename = async (name) => {
//   if (name) {
//     try {
//       await setData(`/book-sales/${0}/class`, name);
//     } catch (error) {
//       alert(error);
//     }
//   }
// };

// Post a new Book
const addBook = async(Book) =>{
  if (Book) {
    try {
      addData(`/book-sales`, Book);
    } catch (error) {
      alert(error);
    }
  }
}

const addUser = async(user) => {
  
  if (user) {
    try {
      addData(`/users`, user);
    } catch (error) {
      alert(error);
    }
  }
}

function App() {
  // Prints the content in the database
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>
  return (
    <div className="App">
       
     <Title/>
        <Body data ={data}/>
    </div>
  );
}

export default App;
