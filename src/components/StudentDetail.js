import React from 'react';
import { connect } from 'react-redux';
import {
  deleteStudentAction,
  updateStudentAction,
} from '../actions/ActionsStudent';

class StudentDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolId: '',
    };
    this.studentData = this.studentData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  studentData(event) {
    this.setState({
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      gpa: this.props.gpa,
      schoolId: event.target.value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.updateStudentAction(this.state);
    window.location.hash = `#/schools/${this.state.schoolId}`;
  }
  refreshPage() {
    window.location.reload();
  }
  render() {
    const { schools, firstName, lastName, gpa, schoolId } = this.props;
    const singleSchool = schools.filter(
      (school) => school.id === this.props.schoolId
    );
    return (
      <div className="school">
        {singleSchool[0] ? (
          <img
            src={
              singleSchool[0] === undefined ? null : singleSchool[0].imageURL
            }
            alt={
              singleSchool[0] === undefined ? null : singleSchool[0].imageURL
            }
          />
        ) : null}
        <li>Name: {firstName + ' ' + lastName}</li>
        <li>GPA: {gpa}</li>
        <br />
        <form onSubmit={this.onSubmit}>
          <select
            onChange={this.studentData}
            value={this.state.schoolId ? this.state.schoolId : schoolId || ''}
          >
            <option key="" value="">
              - Choose School -
            </option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
          <button>Change School</button>
          <button
            className="destroybtn"
            onClick={() => this.props.deleteStudentAction()}
          >
            Destroy Student
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schools: state.schools,
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteStudentAction: () => dispatch(deleteStudentAction(ownProps)),
    updateStudentAction: (studentInfo) =>
      dispatch(updateStudentAction(studentInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
