import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StudentService from "../service/StudentService";
const INSTRUCTOR = "in28minutes";

class StudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      cne: "",
      resultat: "",
      moyenne: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    console.log(this.state.id);
    // eslint-disable-next-line
    if (this.state.id == -1) {
      return;
    }
    StudentService.getStudent(this.state.id).then(response => {
      console.log(response);
      this.setState({
        name: response.data.data[0].name,
        cne: response.data.data[0].cne,
        moyenne: response.data.data[0].moyenne,
        resultat: response.data.data[0].resultat
      });
    });
  }
  validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Enter a Description";
    }
    return errors;
  }
  onSubmit(values) {
    if (this.state.id == -1) {
      let student = {
        name: values.name,
        cne: values.cne,
        resultat: values.resultat,
        moyenne: values.moyenne
      };
      StudentService.createStudent(student).then(() =>
        this.props.history.push("/students")
      );
    } else {
      let student = {
        name: values.name,
        cne: values.cne,
        resultat: values.resultat,
        moyenne: values.moyenne
      };

      StudentService.updateStudent(this.state.id, student).then(() =>
        this.props.history.push("/students")
      );
    }
    console.log(values);
  }

  back() {
    this.props.history.go(-1);
  }

  render() {
    let { name, id, cne, moyenne, resultat } = this.state;
    return (
      <div>
        <div className="container">
          <Formik
            initialValues={this.state}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>name</label>
                  <Field className="form-control" type="text" name="name" />
                </fieldset>

                <fieldset className="form-group">
                  <label>cne</label>
                  <Field className="form-control" type="text" name="cne" />
                </fieldset>

                <fieldset className="form-group">
                  <label>moyenne</label>
                  <Field className="form-control" type="text" name="moyenne" />
                </fieldset>

                <fieldset className="form-group">
                  <label>resultat</label>
                  <Field className="form-control" type="text" name="resultat" />
                </fieldset>

                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="row">
          <button className="btn btn-primary" onClick={this.back}>
            Back
          </button>
        </div>
      </div>
    );
  }
}
export default StudentComponent;
