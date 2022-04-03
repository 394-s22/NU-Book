import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

let data = require('./book.json')
data = data["book-sales"]
console.log(data)

const Books = () => {
  return (
    data.map(book => { return(
      <Book book={book}/>
    )}))
}
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

const hideForm = () => {

}

const Form = () => {
// add inputs to function for onSubmit
  const [visibility, setVisibility] = useState(false);
  if (visibility) {
    return(
      <div>
      <button onClick={() => setVisibility(false)}>X</button>
      <form onSubmit={() => hideForm()}> 
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
      <div className="listBook"><button onClick={() => setVisibility(true)}>List a Book</button></div>
    )
  }
}

function App() {
  return (
    <div className="App">
        <Form/>
        <Books/>
    </div>
  );
}
export default App;