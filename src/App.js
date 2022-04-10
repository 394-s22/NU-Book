import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import { useData, setData, addData, useUserState } from './utilities/firebase.js';
import Title from './Title.js';
import 'bootstrap/dist/css/bootstrap.min.css'

/*
This component represents every book in the books database.
*/
const Books = (props) => {
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>
  const ndata = dictToList(data["book-sales"]);
  if (props.visibility) {
    return (
      ndata.map(book => { return(
        <Book book={book}/>
      )}))
  }
}

const dictToList = (dict) =>{
    let arr = [];
    Object.keys(dict).forEach(key => 
      arr.push(dict[key]))  
    return arr;
}

/*
This component represents an individual book and its properties.
*/
const Book = (props) => {
  return (
    <p>
    Title:  {props.book["title"]}
    <br></br>
      <img src={props.book["url"]} width="100" height="150"/>
      <br></br>
      
    {props.book["class"]}
    Seller: {props.book["seller-name"]}
    <br></br>
    Phone: {props.book["seller-phone"]}
    <br></br>
    Price: ${props.book["price"]}
    <br></br>
   <button  type = "button" className = "btn btn-primary"><a href={"mailto:" + props.book["email"] + "?subject=just-a-subject"}></a>Contact </button>
   <br></br>
   <p></p>
    </p>
  )
}

/* This component dipslays a form that can be used to 
list a book. There are buttons that control the visibility (List Book and X)

THINGS TO DO IN THE FUTURE:
overlay on top 
css

*/ 
const Form = (props) => {
  const [user] = useUserState();
// add inputs to function for onSubmit
  //const [visibility, setVisibility] = useState(false);
  if (props.visibility) {
    return(
      <div>
      <button type = "button" className = "btn btn-primary" onClick={props.handleClick}>X</button>
      <form id="book-form">
        <label>
          Title:
          <input type="text" name="title"/>
        </label>
        <br></br>
        <label>
          Edition:
          <input type="text" name="edition"/>
        </label>
        <br></br>
        <label>
          Department:
          <input type="text" name="department"/>
        </label>
        <br></br>
        <label>
          Class number:
          <input type="text" name="class-number"/>
        </label>
        <br></br>
        <label>
          Your name:
          <input type="text" name="seller-name"/>
        </label>
        <br></br>
        <label>
          Phone number:
          <input type="number" name="seller-phone"/>
        </label>
        <br></br>
        <label>
          Price:
          <input type="number" name="price"/>
        </label>
        <br></br>
        <label>
          Email:
          <input type="text" name= "email" />
        </label>
        <br></br>
        <label>
          Image:
          <input type="url" name = "url" />
        </label>
        <br></br>
        <button className = "btn btn-primary" id="submit_button" type="button" 
        value="Submit" onClick={() => {props.postData(props.handleClick)}}>Submit</button>
      </form>
      </div>
    ); // HTML that includes X button
  }
  else {
    return (
      
      <div className="listBook">
         <br></br>
         <br></br>
         <br></br>
         <br></br>
        <button type = "button" className = "btn btn-primary" onClick={!user ? ()=> alert("you must sign in first to list a book"): props.handleClick}>List a Book</button>
      
      
      </div>
    )
  }
}

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
const Body = () => {
  // bookVisibility is if the books are visible
  // if books are visible, form is not visible
  // formVisibility = !bookVisibility
  const [bookVisibility, setBookVisibility] = useState(true);
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
  
  return (
    <div>
      <Form handleClick={handleClick} visibility={!bookVisibility} postData={postData}/>
      <Books visibility={bookVisibility}/>
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
  // const [data, loading, error] = useData('/'); 
  // if (error) return <h1>{error}</h1>;
  // if (loading) return <h1>Loading the books...</h1>
  //console.log(data["book-sales"]);
  return (
    <div className="App">
       
     <Title/>
        <Books/>
        <Body/>
    </div>
  );
}

export default App;


