import { GET_SCHOOLS, GET_SCHOOL } from "./ActionTypes";
import axios from "axios";

export const listSchoolsAction = () => async dispatch => {
  try {
    const response = await axios.get("/api/schools");
    dispatch({ type: GET_SCHOOLS, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};
export const schoolDetailAction = id => async dispatch => {
  try {
    const response = await axios.get(`/api/schools/${id}`);
    dispatch({ type: GET_SCHOOL, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};
