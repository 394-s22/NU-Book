import logo from './logo.svg';
import './App.css';
/*
import Title from './Title.js';
*/
import * as React from 'react';
import Title from './Title.js';

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

function App() {
  console.log('data');

  return (
    <div className="App">
       
     <Title/>
        <Books/>
    </div>
  );
}

export default App;


