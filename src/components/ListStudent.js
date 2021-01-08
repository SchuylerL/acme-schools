import React from 'react';
import { connect } from 'react-redux';
import { listStudentsAction } from '../actions/ActionsStudent';
import StudentDetail from './StudentDetail';
import CreateStudent from './CreateStudent';

class ListStudent extends React.Component {
  componentDidMount() {
    this.props.listStudentsAction();
  }
  render() {
    const { students, schools } = this.props;
    return (
      <div>
        {/* <CreateStudent schools={schools} /> */}
        {students.map((student) => (
          <div key={student.id}>
            <StudentDetail {...student} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
});
export default connect(mapStateToProps, { listStudentsAction })(ListStudent);
