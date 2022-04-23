import { useEffect, useState } from 'react';
import { ref, listAll } from "firebase/storage";
import { storage } from "../utilities/firebase";

/* 
This component represents an individual book and its properties.
*/
const Book = (props) => {
  const [image, setImage] = useState(""); // should image be a string?
  const imageListRef = ref(storage, "images/") // change to file url
  // based on the props, determine what the url will be and set it
  // so in the other file, when we upload an image, set the url appropriately accordingly
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      

    })
  }, []);

  return (
    <div class="card" style={{width: '22rem', padding: '15px'}}>
      <div class="row no-gutters">
        <div class="col-md-4">
        {/* change image here */}
        <img src={props.book["url"]} alt='book-preview' width="100" height="150"/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{props.book["title"]}</h5>
            <p className="card-text">
            {props.book["department"]} {props.book["class-number"]}
            <br></br>
            {props.book["seller-name"]}
            <br></br>
            ${props.book["price"]}
            <br></br>
            {/* <a href={"mailto:" + props.book["email"] + "?subject=just-a-subject"}>Contact</a> */}
            <a class="btn btn-outline-success btn-sm" href={"mailto:" + props.book["email"] + "?subject=just-a-subject"} role="button">Contact</a>
            </p>
          </div> 
        </div>
      </div> 
    </div>
  )
}

export default Book;