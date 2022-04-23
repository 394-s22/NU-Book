import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';

/*
This component represents every book in the books database.
*/

/*
This function is called whenever books are displayed, but used primarily for searching.
If search was not used, all books are displayed. If search is used, the contents of the search
form are used to filter the books that are displayed.
*/
const filterData =  (data) =>{
  const searchForm = document.getElementById("search-form");
  const allBooks = dictToList(data["book-sales"]);
  if(searchForm){ // they were actually filtering
    const formResults = {
      "title": searchForm.elements["title"].value,
      "edition": searchForm.elements["edition"].value,
      "department": searchForm.elements["department"].value,
      "class-number": searchForm.elements["class-number"].value,
      "price": searchForm.elements["price"].value,
      };
      //adding logic for multiple categories, still just exact matches
      //per category, but the filtered books will be for any exact matches
      const exactFields = ["title", "edition", "department"];
      const num_exactFields = ["edition", "class-number"];
      const num_Fields=["price"];
    
      let lst = [];
      // filtering word fields
      exactFields.forEach((field) => {
        let fieldSpecificBooks = allBooks.filter(book =>
          formResults[field] != "" && book[field].toLowerCase().includes(formResults[field].toLowerCase()));
        lst = Array.from(new Set(lst.concat(fieldSpecificBooks)));
      });

      // filtering numbers
      num_exactFields.forEach((field) => {
        let fieldSpecificBooks = allBooks.filter(book =>
          formResults[field] != "" && book[field].includes(formResults[field]));
        lst = Array.from(new Set(lst.concat(fieldSpecificBooks)));
      });

      // filtering price
      num_Fields.forEach((field) => {
        let fieldSpecificBooks = allBooks.filter(book =>
          formResults[field] != "" && parseFloat(book[field])<=parseFloat(formResults[field]) );
      
        lst = Array.from(new Set(lst.concat(fieldSpecificBooks)));
      });

      if(!formResults["title"] && !formResults["edition"]&& !formResults["price"]){
        return [allBooks, allBooks.length]
      }
      return [lst, allBooks.length];
  }
  else { // they were listing a book
    return [dictToList(data["book-sales"]), allBooks.length];
  }
}

// pass search visibility to books
const Books = (props) => {
    const [data, loading, error] = useData('/'); 
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the books...</h1>
    const ndata = filterData(data);
    if(ndata[0].length == 0){
      //if the search result was empty
      if (props.visibility) {
        return ( 
          <div>
            <p style = {{color : "red"}}>The search was unsuccessful</p>
            <div className="books">
              {ndata[0].map(book => { return(
              <Book book={book}/>
              )})}
            </div>
          </div>
        )
      }
    }
    else if(ndata[0].length < ndata[1]){
      // if search is successful
      if (props.visibility) {
        return ( // added class
          <div>
            <p>{ndata[0].length} Search Results</p>
            <div className="books">
              {ndata[0].map(book => { return(
              <Book book={book}/>
              )})}
            </div>
          </div>
        )
      }
    }
    else{
      // before searching
      if (props.visibility) {
        return ( // added class
          <div>
            <div className="books">
              {ndata[0].map(book => { return(
              <Book book={book}/>
              )})}
            </div>
          </div>
        )
      }
    }
  }

export default Books;