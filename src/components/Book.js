/* 
This component represents an individual book and its properties.
*/
const Book = (props) => {
  return (
    <div class="card" style={{width: '22rem', padding: '15px'}}>
      <div class="row no-gutters">
        <div class="col-md-4">
        <img src={props.book["url"]} alt='book-preview' width="100" height="150"/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{props.book["title"]}</h5>
            <p className="card-text">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{props.book["department"]} {props.book["class-number"]}</li>
              <li class="list-group-item">{props.book["seller-name"]}</li>
              <li class="list-group-item">${props.book["price"]}</li>
            </ul>

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