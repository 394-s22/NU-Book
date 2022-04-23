import { Button } from 'react-bootstrap';
import {useState} from 'react'
import { useUserState } from '../utilities/firebase.js';
import {storage} from "../utilities/firebase.js"
import {ref, uploadBytes} from "firebase/storage"
import Book from './Book';
import UploadAndDisplayImage from './UploadPic.js'


/* This component displays a form that can be used to 
list a book. There are buttons that control the visibility (List Book and X)

THINGS TO DO IN THE FUTURE:
overlay on top 
css

For the Button update:
The original icon style was rectangular, but now the corners of the icons have become more rounded and look more comfortable

*/ 

export const dictToList = (dict) =>{
    let arr = [];
    Object.keys(dict).forEach(key => 
      arr.push(dict[key]))  
    return arr;
}


export const Form = (props) => {
    const [user] = useUserState();
    const [imageUpload, setImageUpload] = useState(null);
    // add inputs to function for onSubmit
    const uploadImageAndPostData = (d) => {
      props.postData(d); 
      uploadImage();
    }
    const uploadImage = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name}`)
      uploadBytes(imageRef, imageUpload).then(()=>{
        alert("image uploaded");
      })
    }
    if (props.visibility) { // added another <br> to make the X button visible but we should do margin/padding later
      if (props.searchVisibility) {
        return(
          <div>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="primary" size="sm" onClick={props.handleClickSearch}>X</Button>
            <form id="search-form">
              <label>
                <input class="form-control" type="text" name="title" placeholder="Title"></input>
              </label>
              <br></br>
              <label>
                <input class="form-control" type="text" name="edition" placeholder="Edition"></input>
              </label>
              <br></br>
              <label>
                <input class="form-control" type="text" name="department" placeholder="Department"></input>
              </label>
              <br></br>
              <label>
                <input class="form-control" type="text" name="class-number" placeholder="Class number"></input>
              </label>
              <br></br>
              <label>
                <input class="form-control" type="number" name="price" placeholder="Price: less than" />
              </label>
              <br></br>
              <br></br>
              <br></br>
              <Button variant='primary' id="submit_button" type="button" 
              value="Submit" onClick={props.handleClickSearch}>Submit</Button>
            </form>
            {/* change the on-click function -- SHOULD NOT BE POST */}
          </div>
          );
      }
      else {
        return(
          <div>
            <br></br>
             <br></br>
             <br></br>
          <Button variant="primary" size="sm" onClick={props.handleClick}>X</Button>
          <form id="list-form">
            <label>
              <input class="form-control" type="text" name="title" placeholder="Title"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="edition" placeholder="Edition"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="department" placeholder="Department"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="class-number" placeholder="Class number"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="seller-name" placeholder="Your name"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="number" name="seller-phone" placeholder="Phone number"></input>
            </label>
            <br></br>
            <label>
              <input class="form-control" type="number" name="price" placeholder="Price" />
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="quality" placeholder="Quality" />
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="ISBN" placeholder="ISBN" />
            </label>
            <br></br>
            <label>
              <input class="form-control" type="text" name="email" placeholder="Email" />
            </label>
            <br></br>
            <label>
              <input class="form-control" type="url" name="url" placeholder="Image" />
            </label>
            <br></br>
            <Button variant='primary' id="submit_button" type="button" 
            value="Submit" onClick={() => {uploadImageAndPostData(props.handleClick)}}>Submit</Button>
          </form> 
          <div className = "upload-image">
              <input type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
            </div> 
          </div>
        );
      }
    }
    else {
      return (
        <div className="listBook">
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           {/* !user ? ()=> alert("you must sign in first to list a book"): */}
          <Button variant="primary" size="sm" onClick={props.handleClick}>List a Book</Button>
          {/* <button type = "button" className = "btn-primary" onClick={ props.handleClick}>List a Book</button> */}
          <Button variant="secondary" size="sm" onClick={props.handleClick}>Search for a Book</Button>
          {/* <button type = "button" className = "btn-secondary" onClick={ props.handleClickSearch}>Search for a Book</button>       */}
        </div>
      )
    }
  }