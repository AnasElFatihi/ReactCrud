import axios from "axios";

// const INSTRUCTOR = 'in28minutes'
// const LOCALHOST = 'http://localhost:8090'
// const INSTRUCTOR_API_URL = `${LOCALHOST}}`

class CourseDataService {
  getAllStudents() {
    // return axios.get(`${LOCALHOST}/students`);

    return axios.get("http://localhost:3000/api/v1/etudiants/");
  }

  deleteStudent(id) {
    return axios.delete(`http://localhost:3000/api/v1/etudiants/${id}`);
  }

  getStudent(id) {
    return axios.get(`http://localhost:3000/api/v1/etudiants/${id}`);
  }

  updateStudent(id, student) {
    return axios.put(`http://localhost:3000/api/v1/etudiants/${id}`, student);
  }
  createStudent(student) {
    return axios.post(`http://localhost:3000/api/v1/etudiants`, student);
  }
}
export default new CourseDataService();
