import React, { useState } from "react";
import { Button} from "react-bootstrap";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h3>Upload and Display Image usign React Hook's</h3>
      {selectedImage && (
        <div>
        <img id = "upload-image" alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <Button onClick={()=>setSelectedImage(null)}>Remove</Button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;