export const fetchDepartments = async () => {
    fetch('./departments.json')
    .then(response => {
      return response.json();
    })
  }
  
export const Departments = (props) => {
    const departments = props.departments["departments"]
    return(
      departments.map(department => {
        return(
          <option value={department["abbrev"]}>{department["abbrev"]}</option>
        )
      })
    );
  }