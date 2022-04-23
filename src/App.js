import './App.css';
import React, {useState} from "react";
import { useData, setData, addData, useUserState, test_user, delete_book } from './utilities/firebase.js';
import Title from './components/Title.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from './components/ListForm.js';
import Books from './components/Books';

const postData = (handleClick, email , data) => {
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
    addBook(formResults, email, data );
    handleClick()
  }
}

export const AddUser = async(user) => {
  //get user on change
  if (user) {
    // this creates a user object and add to the database
    const userObj = {
        userName: user.displayName,
        email : user.email,
        books : {0 : 0}
    }
    console.log(user)
    try {
      await addData(`/users`, userObj);
    } catch (error) {
      alert(error);
    }
  }
}

const Body = (props) => {
  const [user] = useUserState();
  // AddUser(user);
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
      <Form handleClick={handleClick} visibility = {!bookVisibility} handleClickSearch = {handleClickSearch} searchVisibility={searchVisibility} postData={postData} data = {props.data} email = {user? user.email: null}/>
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
// find current user key in FireBase
const Find_current_user = (email, data) =>{
    let users;
    users = data["users"];
    
    // let arr = [];
    //   Object.keys(dict).forEach(key => 
    //     arr.push(dict[key]))  
    //   return arr;
    let user_key = [];
    Object.keys(users).forEach(key => {if(users[key].email === email) {user_key.push(key)}})
    
    return user_key;
}

const addBook = async(Book, email, data) =>{
  if (Book) {
    try {
      addData(`/book-sales`, Book);
      let key = Find_current_user(email, data);
      console.log(key[0]);
      addData(`/users/${key[0]}/books`, Book)
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
