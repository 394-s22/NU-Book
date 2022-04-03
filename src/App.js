import logo from './logo.svg';
import './App.css';
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
function App() {
  console.log('data');
  return (
    <div className="App">
        <button>List a Book</button>
        <Books/>
    </div>
  );
}
export default App;