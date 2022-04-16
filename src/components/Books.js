import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';
/*
This component represents every book in the books database.
*/


const filterData =  (data) =>{
  const bookForm = document.getElementById("book-form");
  let form;
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
      //adding logic for multiple categories, still just exact matches
      //per category, but the filtered books will be for any exact matches
      const allBooks = dictToList(data["book-sales"]);
      const exactFields = ["title", "department", "class-number"];
      let lst = [];
      exactFields.forEach((field) => {
        let fieldSpecificBooks = allBooks.filter(book =>
          book[field] === formResults[field] && formResults[field] != "");
        lst = Array.from(new Set(lst.concat(fieldSpecificBooks)));
      });
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