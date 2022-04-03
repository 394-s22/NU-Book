import logo from './logo.svg';
import './App.css';
import { useData, setData, addData } from './utilities/firebase.js';


const Books = () => {
  const [data, loading, error] = useData('/'); 
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the books...</h1>
  console.log(data["book-sales"]);
  return (
    data["book-sales"].map(book => { return(
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
    {props.book["price"]}</p>
  )
}
// Update Functions (more to come)
// currently it only updates the first book
const rename = async (name) => {
  if (name) {
    try {
      await setData(`/book-sales/${0}/class`, name);
    } catch (error) {
      alert(error);
    }
  }
};

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
let newBook = {
  "title" : "Chinese"
}

addBook(newBook);



function App() {
  // Prints the content in the database
  // const [data, loading, error] = useData('/'); 
  // if (error) return <h1>{error}</h1>;
  // if (loading) return <h1>Loading the books...</h1>
  //console.log(data["book-sales"]);
  return (
    <div className="App">
        <Books/>
    </div>
  );
}
export default App;