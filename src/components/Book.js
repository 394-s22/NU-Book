
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import {useEffect, useState} from 'react'
import {storage} from '../utilities/firebase.js'
  
/* 
This component represents an individual book and its properties.
*/
const Book = (props) => {
  const [imageList, setImageList] = useState([]);
  const listFormTitle = props.book["title"].replace(/ /g, "");
  const listFormName = props.book["seller-name"].replace(/ /g, "");
  const im_identifier = listFormTitle + "-" + listFormName;
  const imageListRef = ref(storage, `images/${im_identifier}` + ".*");
  // const imageListRef = ref(storage, `images/dababy` + ".jfif");

  const imagePath = imageListRef._location.path_;
  console.log(imagePath);
  let imageURL;
  getDownloadURL(ref(storage, imagePath)).then((url) => {
    imageURL = url;
    console.log(url);
    return (
      <div class="card" style={{width: '22rem', padding: '15px'}}>
        <div class="row no-gutters">
          <div class="col-md-4">
          {/* change image here */}
          <img src={imageURL} alt='book-preview' width="100" height="150"/>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{props.book["title"]}</h5>
              <p className="card-text">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{props.book["department"]} {props.book["class-number"]}</li>
                <li class="list-group-item">{props.book["seller-name"]}</li>
                <li class="list-group-item">${props.book["price"]}</li>
                <li class="list-group-item">{props.book["quality"]}</li>
              </ul>
  
              {/* <a href={"mailto:" + props.book["email"] + "?subject=just-a-subject"}>Contact</a> */}
              <a class="btn btn-outline-success btn-sm" href={"mailto:" + props.book["email"] + "?subject=just-a-subject"} role="button">Contact</a>
              </p>
            </div> 
          </div>
        </div> 
      </div>
    )
  });
  
}

export default Book;