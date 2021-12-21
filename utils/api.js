import axios from "axios";

class EmployeeService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}}`,
    });
    this.service = service;
  }

  getAll() {
    //axios.get('http://localhost:5000/characters')
    return this.service.get("/employee-routes");
  }

  getEmployees(id) {
    //axios.get('http://localhost:5000/characters/1')
    return this.service.get(`/employee-routes/${id}`);
  }

  addEmployee(employees) {
    //axios.post('http://localhost:5000/characters'), { name: 'miguel'}
    return this.service.post("/employee-routes", employees);
  }
}

export default EmployeeService;
