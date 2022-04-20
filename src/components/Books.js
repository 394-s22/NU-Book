import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';
/*
This component represents every book in the books database.
*/


const filterData =  (data) =>{
<<<<<<< HEAD
  const bookForm = document.getElementById("book-form");
  let form;
  if(bookForm){
=======
  const searchForm = document.getElementById("search-form");
  if(searchForm){ // they were actually filtering
>>>>>>> 88a478384458f3424e58d02397f6b5d051b3e17f
    const formResults = {
      "title": searchForm.elements["title"].value,
      "edition": searchForm.elements["edition"].value,
      "department": searchForm.elements["department"].value,
      "class-number": searchForm.elements["class-number"].value,
      "price": searchForm.elements["price"].value,
      };
      //adding logic for multiple categories, still just exact matches
      //per category, but the filtered books will be for any exact matches
      const allBooks = dictToList(data["book-sales"]);
      const exactFields = ["title", "department", "class-number"];
      let lst = [];
      exactFields.forEach((field) => {
        let fieldSpecificBooks = allBooks.filter(book =>
          formResults[field] != "" && book[field] === formResults[field]);
        lst = Array.from(new Set(lst.concat(fieldSpecificBooks)));
      });

      if(lst.length==0){ // they exit the form without typing anything, or without filling out all the fields
        // show every original book
        return dictToList(data["book-sales"]);
      }
      // if they actually are filtering
      return lst;
  }
  else { // they were listing a book
    // if(!searchVisibility) { // they successfully list a book
    //   console.log("here")
    //   // show only the book they just listed
    //   return [lst[0]]
    // }
    return dictToList(data["book-sales"]);
  }
}

// pass search visibility to books
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