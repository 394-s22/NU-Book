import './App.css';
import React, {useState} from "react";
import { useData, setData, addData, useUserState } from './utilities/firebase.js';
import Title from './Title.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from './components/ListForm.js';
import Books from './components/Books';

const postData = (handleClick) => {
  const bookForm = document.getElementById("book-form");
  const formResults = {
    "title": bookForm.elements["title"].value,
    "edition": bookForm.elements["edition"].value,
    "url": bookForm.elements["url"].value,
    "department": bookForm.elements["department"].value,
    "class-number": bookForm.elements["class-number"].value,
    "seller-name": bookForm.elements["seller-name"].value,
    "seller-phone": bookForm.elements["seller-phone"].value,
    "price": bookForm.elements["price"].value,
    "email": bookForm.elements["email"].value
    };
  addBook(formResults);
  handleClick()
}

const Body = (props) => {
  // bookVisibility is if the books are visible
  // if books are visible, form is not visible
  // formVisibility = !bookVisibility
  const [bookVisibility, setBookVisibility] = useState(true);
  const [searchVisibility, setSearchVisibility] = useState(true);
  // how to pass state down to children?

  const handleClick = () => {
    if(bookVisibility) {
      console.log(document.getElementById("submit_button"))
      setBookVisibility(false);
    } else {
      setBookVisibility(true);
    }
  }
  // pass down handleClick function
  
  const handleClickSearch = () => {
    if(searchVisibility) {
      console.log(document.getElementById("submit_button"))
      setSearchVisibility(false);
    } else {
      setSearchVisibility(true);
    }
  }

  return (
    <div>
      <Form handleClick={handleClick} visibility = {!bookVisibility} handleClickSearch = {handleClickSearch} searchVisibility={!searchVisibility}postData={postData} data = {props.data}/>
      {/* <SearchForm handleClick={handleClickSearch} visibility={!bookVisibility} postData={postData}/> */}
      <Books  visibility={bookVisibility && searchVisibility}/>
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

function App() {
  // Prints the content in the database
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>

  return (
    <div className="App">
       
     <Title/>
        <Books/>
        <Body data ={data}/>
    </div>
  );
}

export default App;
