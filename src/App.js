import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

let data = require('./book.json')
data = data["book-sales"]
console.log(data)

/*
This component represents every book in the books database.
*/
const Books = (props) => {

  //const [visibility, setVisibility] = useState(false);
  if (props.visibility) {
    return (
      data.map(book => { return(
        <Book book={book}/>
      )}))
  }
}

/*
This component represents an individual book and its properties.
*/
const Book = (props) => {
  return (
    <p>
    {props.book["title"]},
      <img src={props.book["url"]}/>
    {props.book["class"]},
    {props.book["seller-name"]},
    {props.book["seller-phone"]},
    {props.book["price"]}
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

function App() {
  return (
    <div className="App">
      <Body/>
    </div>
  );
}
export default App;