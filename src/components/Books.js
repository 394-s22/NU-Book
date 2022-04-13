import Book from './Book';
import { useData } from '../utilities/firebase.js';
import { dictToList } from './ListForm.js';
/*
This component represents every book in the books database.
*/
const Books = (props) => {
    const [data, loading, error] = useData('/'); 
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the books...</h1>
    const ndata = dictToList(data["book-sales"]);
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