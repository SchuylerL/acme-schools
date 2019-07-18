import React from "react";
import { createStudentAction } from "../actions/ActionsStudent";
import { connect } from "react-redux";

class CreateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gpa: "",
      schoolId: ""
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selector = this.selector.bind(this);
  }
  onHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  selector(event) {
    this.setState({
      schoolId: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.createStudentAction(this.state);
    window.location.hash = "/students";
  }
  render() {
    const { schools } = this.props;
    return (
      <div className="addStudentToSchool">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="firstName"
            value={this.state.firstName}
          />
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="lastName"
            value={this.state.lastName}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="email"
            value={this.state.email}
          />
          <label htmlFor="gpa">GPA: </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="gpa"
            value={this.state.gpa}
          />
          Enroll At:
          <select onChange={this.selector}>
            <option key="" value="">
              -- Choose School --
            </option>
            {schools.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
          <button>Add Student</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createStudentAction: studentInfo =>
      dispatch(createStudentAction(studentInfo))
  };
};
const mapStateToProps = state => {
  return {
    schools: state.schools
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStudent);
