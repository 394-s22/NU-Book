import { useState, useEffect } from 'react';
  
export const Departments = () => {
    const [depts, setDepts] = useState({"departments": []});
    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await fetch('./departments.json')
            const json = await data.json();
            setDepts(json);
        }
        fetchDepartments()
            .catch(console.error);
    }, [])
    const departments = depts["departments"]
    return(
      departments.map(department => {
        return(
          <option value={department["abbrev"]}>{department["abbrev"]}</option>
        )
      })
    );
  }