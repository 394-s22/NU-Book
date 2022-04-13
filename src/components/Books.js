import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';
/*
This component represents every book in the books database.
*/


const filterData =  (data) =>{
  const bookForm = document.getElementById("book-form");
  if(bookForm){
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
  
      let lst = dictToList(data["book-sales"]);
      lst = lst.filter(book => book["title"] === formResults["title"]);
      console.log(lst); 
      return lst;
  }
  return dictToList(data["book-sales"]);
}

const Books = (props) => {
    const [data, loading, error] = useData('/'); 
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the books...</h1>
    const ndata = filterData(data);
    if (props.visibility) {
      return ( // added class
        <div className="books">
          {ndata.map(book => { return(
          <Book book={book}/>
          )})}
        </div>
      )
    }
  }

export default Books;