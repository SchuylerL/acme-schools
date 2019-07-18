import React from "react";
import { connect } from "react-redux";
import { updateStudentAction } from "../actions/ActionsStudent";

class UpdateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      gpa: "",
      schoolId: ""
    };
    this.studentData = this.studentData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  studentData(event) {
    const studentInfo = this.props.students.filter(
      student => student.id === event.target.value
    );
    this.setState({
      id: studentInfo[0].id,
      firstName: studentInfo[0].firstName,
      lastName: studentInfo[0].lastName,
      email: studentInfo[0].email,
      gpa: studentInfo[0].gpa,
      schoolId: this.props.school.id
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.updateStudentAction(this.state);
    window.location.hash = `#/schools/${this.state.schoolId}`;
  }
  render() {
    return (
      <div className="addStudentToSchool">
        <form onSubmit={this.onSubmit}>
          <select onChange={this.studentData}>
            <option key="" value="">
              -- Add Student --
            </option>
            {this.props.students.map(student => (
              <option key={student.id} value={student.id}>
                {student.firstName + " " + student.lastName}
              </option>
            ))}
          </select>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateStudentAction: studentInfo =>
      dispatch(updateStudentAction(studentInfo))
  };
};
const mapStateToProps = state => {
  return {
    students: state.students
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudent);
