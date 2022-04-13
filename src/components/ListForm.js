import { useUserState } from '../utilities/firebase.js';
import Book from './Book';

/* This component displays a form that can be used to 
list a book. There are buttons that control the visibility (List Book and X)

THINGS TO DO IN THE FUTURE:
overlay on top 
css

*/ 

export const dictToList = (dict) =>{
    let arr = [];
    Object.keys(dict).forEach(key => 
      arr.push(dict[key]))  
    return arr;
}

export const filterData =  (handleClickSearch, data) =>{
    const bookForm = document.getElementById("book-form");
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
      return (
          lst.map(book => { return(
            <div>
            <Book book={book}/>
            </div>
          )})
      )   
  }

export const Form = (props) => {
    const [user] = useUserState();
    console.log(props.data);
  // add inputs to function for onSubmit
    //const [visibility, setVisibility] = useState(false);
    if (props.visibility) {
      return(
        <div>
           <br></br>
           <br></br>
        <button type = "button" className = "btn-primary" onClick={props.handleClick}>X</button>
        <form id="book-form">
          <label>
            Title:
            <input type="text" name="title"/>
          </label>
          <br></br>
          <label>
            Edition:
            <input type="text" name="edition"/>
          </label>
          <br></br>
          <label>
            Department:
            <input type="text" name="department"/>
          </label>
          <br></br>
          <label>
            Class number:
            <input type="text" name="class-number"/>
          </label>
          <br></br>
          <label>
            Your name:
            <input type="text" name="seller-name"/>
          </label>
          <br></br>
          <label>
            Phone number:
            <input type="number" name="seller-phone"/>
          </label>
          <br></br>
          <label>
            Price:
            <input type="number" name="price"/>
          </label>
          <br></br>
          <label>
            Email:
            <input type="text" name= "email" />
          </label>
          <br></br>
          <label>
            Image:
            <input type="url" name = "url" />
          </label>
          <br></br>
          <button className = "btn-primary" id="submit_button" type="button" 
          value="Submit" onClick={() => {props.postData(props.handleClick)}}>Submit</button>
        </form>
        </div>
      ); // HTML that includes X button
    }
    else if(props.searchVisibility){
      return(
        <div>
        <br></br>
        <br></br>
     <button type = "button" className = "btn-primary" onClick={props.handleClickSearch}>X</button>
     <form id="book-form">
       <label>
         Title:
         <input type="text" name="title"/>
       </label>
       <br></br>
       <label>
         Edition:
         <input type="text" name="edition"/>
       </label>
       <br></br>
       <label>
         Department:
         <input type="text" name="department"/>
       </label>
       <br></br>
       <label>
         Class number:
         <input type="text" name="class-number"/>
       </label>
       <br></br>
       <label>
         Your name:
         <input type="text" name="seller-name"/>
       </label>
       <br></br>
       <label>
         Phone number:
         <input type="number" name="seller-phone"/>
       </label>
       <br></br>
       <label>
         Price:
         <input type="number" name="price"/>
       </label>
       <br></br>
       <label>
         Email:
         <input type="text" name= "email" />
       </label>
       <br></br>
       <label>
         Image:
         <input type="url" name = "url" />
       </label>
       <br></br>
       <button className = "btn-primary" id="submit_button" type="button" 
       value="Submit" onClick={() => {props.filterData(props.handleClickSearch, props.data)}}>Search</button>
     </form>
     </div>
      )
    }
    else {
      return (
        <div className="listBook">
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           {/* !user ? ()=> alert("you must sign in first to list a book"): */}
          <button type = "button" className = "btn-primary" onClick={ props.handleClick}>List a Book</button>
          <button type = "button" className = "btn-secondary" onClick={ props.handleClickSearch}>Search for a Book</button>      
        </div>
      )
    }
  }