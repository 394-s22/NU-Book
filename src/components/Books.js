import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';
/*
This component represents every book in the books database.
*/


// books should have access to searchVisibility 
const filterData =  (data, searchVisibility) =>{
  const searchForm = document.getElementById("search-form");
  if(searchForm){
    // now we should have search-form and list-form
    const formResults = {
      "title": searchForm.elements["title"].value,
      "edition": searchForm.elements["edition"].value,
      "url": searchForm.elements["url"].value,
      "department": searchForm.elements["department"].value,
      "class-number": searchForm.elements["class-number"].value,
      "seller-name": searchForm.elements["seller-name"].value,
      "seller-phone": searchForm.elements["seller-phone"].value,
      "price": searchForm.elements["price"].value,
      "email": searchForm.elements["email"].value
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

      if(lst.length==0){ // they exit the form without typing anything, or without filling out all the fields
        // show every original book
        return dictToList(data["book-sales"]);
      }
    
      if(!searchVisibility) { // they successfully list a book
        console.log("here")
        // show only the book they just listed
        return [lst[0]]
      }
      // if they actually are filtering
      return lst;
  }
  return dictToList(data["book-sales"]);
}

// pass search visibility to books
const Books = (props) => {
    const [data, loading, error] = useData('/'); 
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the books...</h1>
    const ndata = filterData(data, props.searchVisibility);
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