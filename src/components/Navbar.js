import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { listSchoolsAction } from '../actions/ActionsSchool';
import { listStudentsAction } from '../actions/ActionsStudent';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolName: '',
      schoolId: '',
    };
  }
  componentDidMount() {
    this.props.listSchoolsAction();
    this.props.listStudentsAction();
  }
  render() {
    const { schools, students } = this.props;
    //find the most popular school
    let count = 0,
      popindex = 0,
      popschoolname = '';
    const pop = schools.map(
      (school) =>
        students.reduce(
          (tot, i) => (i.schoolId && i.schoolId === school.id ? tot + 1 : tot),
          0
        ) + school.id
    );
    for (let i = 0; i < pop.length; i++) {
      if (Number(pop[i][0]) > count) {
        count = Number(pop[i][0]);
        popindex = pop[i].slice(1);
      }
    }
    for (let key in schools)
      if (schools[key].id === popindex) popschoolname = schools[key].name;
    //get the top school
    const getTopSchool = (stdnts, schls) => {
      const obj = {};
      const studentFiltered = stdnts.filter(
        (student) => student.schoolId !== null
      );
      for (let i = 0; i < studentFiltered.length; i++) {
        if (!obj[studentFiltered[i].schoolId]) {
          obj[studentFiltered[i].schoolId] = [];
          obj[studentFiltered[i].schoolId].push(studentFiltered[i]);
        } else {
          obj[studentFiltered[i].schoolId].push(studentFiltered[i]);
        }
      }
      const keys = Object.keys(obj),
        totalsCheck = keys.map((item) => obj[item]);
      const avgGPA = totalsCheck.map(
        (item) =>
          item.reduce((sum, i) => sum + parseFloat(i.gpa), 0) / item.length
      );
      const idx = avgGPA.indexOf(Math.max(...avgGPA)),
        smartSchool = keys[idx],
        school = schls.filter((school) => school.id === smartSchool);
      school.push(avgGPA);
      // school[0].gpaa=avgGPA
      // console.log(school);
      return school;
    };
    let topschoolsgpa = '';
    let topschool = '',
      smartid = '',
      smart = getTopSchool(students, schools);
    if (smart[0] !== undefined) {
      topschool = smart[0].name;
      smartid = smart[0].id;
      smart = smart.flat();
      topschoolsgpa = smart[smart.length - 1];
      // topschoolsgpa = topschoolsgpa[0];
    }
    // console.log(smart);
    // console.log(topschoolsgpa);
    return (
      <div className="navbar">
        <NavLink className="navlink" exact to="/">
          ACME Schools:
          <br />
          Enroll
        </NavLink>
        <NavLink className="navlink" exact to="/schools">
          Schools:
          <br />({schools.length})
        </NavLink>
        <NavLink className="navlink" exact to="/students">
          Students:
          <br />({students.length})
        </NavLink>
        <NavLink
          className="navlink"
          exact
          to={`/schools/${popindex === 0 ? '' : popindex}`}
        >
          Most Popular:
          <br />
          {popschoolname} {count === 0 ? null : '(' + count + ' enrolled' + ')'}
        </NavLink>
        <NavLink className="navlink" exact to={`/schools/${smartid}`}>
          Top School:
          <br />
          {topschool}{' '}
          {topschoolsgpa === undefined
            ? null
            : '(' + topschoolsgpa + ' GPA' + ')'}
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schools: state.schools,
  students: state.students,
});
export default connect(mapStateToProps, {
  listSchoolsAction,
  listStudentsAction,
})(Navbar);
