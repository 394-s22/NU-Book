/* 
This component represents an individual book and its properties.
*/
const Book = (props) => {
  return (
    <div class="card" style={{width: '22rem', padding: '15px'}}>
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={props.book["url"]} width="100" height="150"/>
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
            <a href={"mailto:" + props.book["email"] + "?subject=just-a-subject"}>Contact</a>
            </p>
          </div> 
        </div>
      </div> 
    </div>
  )
}

export default Book;