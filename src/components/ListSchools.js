/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateStudent from './UpdateStudent';
// import CreateStudent from './CreateStudent';

class ListSchools extends React.Component {
  render() {
    const { schools, students } = this.props;
    return (
      <div>
        {/* <CreateStudent schools={schools} /> */}
        {schools.map((school) => (
          <div className="school" key={school.id}>
            <img src={school.imageURL} alt={school.name} />
            <Link className="schoolListName" to={`/schools/${school.id}`}>
              {school.name}
            </Link>
            Student Count:{' '}
            {students.reduce(
              (tot, i) =>
                i.schoolId && i.schoolId === school.id ? tot + 1 : tot,
              0
            )}
            <UpdateStudent school={school} students={students} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schools: state.schools,
  students: state.students,
});
export default connect(mapStateToProps)(ListSchools);
