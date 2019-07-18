import {
  GET_STUDENTS,
  DELETE_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT
} from "./ActionTypes";
import axios from "axios";

export const listStudentsAction = () => async dispatch => {
  try {
    const response = await axios.get("/api/students");
    dispatch({ type: GET_STUDENTS, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};
export const deleteStudentAction = student => async dispatch => {
  try {
    await axios.delete(`/api/students/${student.id}`);
    dispatch({ type: DELETE_STUDENT, payload: student });
  } catch (e) {
    console.error(e);
  }
};
export const createStudentAction = studentInfo => async dispatch => {
  try {
    const createResponse = await axios.post("/api/students", studentInfo);
    dispatch({ type: CREATE_STUDENT, payload: createResponse.data });
  } catch (e) {
    console.error(e);
  }
};
export const updateStudentAction = studentInfo => async dispatch => {
  try {
    const response = await axios.put(
      `/api/students/${studentInfo.id}`,
      studentInfo
    );
    dispatch({ type: UPDATE_STUDENT, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};
