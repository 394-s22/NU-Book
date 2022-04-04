import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import { useData, setData, addData } from './utilities/firebase.js';
import Title from './Title.js';

/*
This component represents every book in the books database.
*/
const Books = (props) => {
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>
  console.log(data["book-sales"]);
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
    {props.book["title"]},
    <br></br>
      <img src={props.book["url"]} width="100" height="150"/>
      <br></br>
      
    {props.book["class"]},
    <br></br>
    {props.book["seller-name"]},
    <br></br>
    {props.book["seller-phone"]},
    <br></br>
    {props.book["price"]}
    <br></br>
   <a href="mailto:mail@address.com?subject=just-a-subject">Contact</a>
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
// add inputs to function for onSubmit
  //const [visibility, setVisibility] = useState(false);
  if (props.visibility) {
    return(
      <div>
      <button onClick={props.handleClick}>X</button>
      <form>
        <label>
          Title:
          <input type="text" title="title"/>
        </label>
        <label>
          Edition:
          <input type="text" edition="edition"/>
        </label>
        <label>
          Department:
          <input type="text" department="department"/>
        </label>
        <label>
          Class number:
          <input type="text" class-number="class-number"/>
        </label>
        <label>
          Your name:
          <input type="text" seller-name="seller-name"/>
        </label>
        <label>
          Phone number:
          <input type="number" seller-phone="seller-phone"/>
        </label>
        <label>
          Price:
          <input type="number" price="price"/>
        </label>
      </form>
      </div>
    ); // HTML that includes X button
  }
  else {
    return (
      <div className="listBook"><button onClick={props.handleClick}>List a Book</button></div>
    )
  }
}

const Body = () => {
  // bookVisibility is if the books are visible
  // if books are visible, form is not visible
  // formVisibility = !bookVisibility
  const [bookVisibility, setBookVisibility] = useState(true);
  // how to pass state down to children?
  const handleClick = () => {
    if(bookVisibility) {
      setBookVisibility(false);
    } else {
      setBookVisibility(true);
    }
  }
  // pass down handleClick function
  
  return (
    <div>
      <Form handleClick={handleClick} visibility={!bookVisibility}/>
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


