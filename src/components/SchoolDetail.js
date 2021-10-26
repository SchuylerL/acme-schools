import React from 'react';
import { connect } from 'react-redux';
import StudentDetail from './StudentDetail';
// import UpdateStudent from './UpdateStudent';
import { schoolDetailAction } from '../actions/ActionsSchool';

class SchoolDetail extends React.Component {
  componentDidMount() {
    this.props.schoolDetailAction(this.props.match.params.id);
  }
  render() {
    const { school, students } = this.props;
    return (
      <div>
        {students
          .filter((student) => student.schoolId === school.id)
          .map((student) => (
            <StudentDetail key={student.id} {...student} />
          ))}
        {/* <UpdateStudent school={school} students={students} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  school: state.school,
  students: state.students,
});
export default connect(mapStateToProps, { schoolDetailAction })(SchoolDetail);
