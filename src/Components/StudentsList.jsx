import React, { Component } from "react";
import StudentService from "../service/StudentService";

class StudentsList extends Component {
  //@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      message: null
    };

    this.refreshList = this.refreshList.bind(this);

    this.deleteStudentClicked = this.deleteStudentClicked.bind(this);
    this.updateStudentClicked = this.updateStudentClicked.bind(this);
    this.addStudentClicked = this.addStudentClicked.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    StudentService.getAllStudents().then(response => {
      console.log(response);
      this.setState({ students: response.data.data });
    });
  }

  deleteStudentClicked(id) {
    StudentService.deleteStudent(id).then(response => {
      this.setState({ message: `Delete of student ${id} Successful` });
      this.refreshList();
    });
  }

  updateStudentClicked(id) {
    console.log("update " + id);
    this.props.history.push(`/students/${id}`);
  }

  addStudentClicked() {
    this.props.history.push(`/students/-1`);
  }

  // {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
  render() {
    return (
      <div className="container">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>CNE</th>
                <th>Moyenne</th>
                <th>Résultat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(student => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.cne}</td>
                  <td>{student.moyenne}</td>
                  <td>{student.resultat}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateStudentClicked(student._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteStudentClicked(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <button className="btn btn-success" onClick={this.addStudentClicked}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
export default StudentsList;
