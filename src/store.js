import {
  GET_SCHOOLS,
  GET_STUDENTS,
  GET_SCHOOL,
  DELETE_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT
} from "./actions/ActionTypes";
import { createStore, applyMiddleware } from "redux";
const thunkMiddleware = require("redux-thunk").default;

const initialState = {
  school: {},
  schools: [],
  student: {},
  students: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHOOLS:
      return { ...state, schools: action.payload };
    case GET_SCHOOL:
      return { ...state, school: action.payload };
    case GET_STUDENTS:
      return { ...state, students: action.payload };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          student => student.id !== action.payload.id
        )
      };
    case CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
