import { HANDLE_ERROR, LOADING, SET_USER } from "./types";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { END_POINT_AUTH, END_POINT_CREATE_USER } from "../../constants";

export const handleError = (payload, dispatch) => {
  console.log(payload);
  setLoading(false, dispatch);
  dispatch({ type: HANDLE_ERROR, payload });

  setTimeout(() => {
    const payload = { error: false, errorMsn: "" };
    dispatch({ type: HANDLE_ERROR, payload });
  }, 4000);
};
export const setLoading = (loading, dispatch) => {
  dispatch({ type: LOADING, payload: loading });
};

export const registryDispatch = async (user, dispatch) => {
  console.log("user =>", user);
  try {
    setLoading(true, dispatch);

    const res = await clientAxios.post(END_POINT_CREATE_USER, user);
    const { token } = res.data;
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error registryDispatch =>", error);

    handleError(
      { error: true, errorMsn: error && error.response.data.msn },
      dispatch
    );
  }
};
export const loginDispatch = async (user, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await clientAxios.post(END_POINT_AUTH, user);
    userAuth(res.data.token, dispatch);
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error loginDispatch =>", error.response);
    handleError({ error: true, errorMsn: error.response.data.msn }, dispatch);
  }
};

export const userAuth = async (token, dispatch) => {
  localStorage.setItem("token", token);
  if (token) {
    tokenAuth(token);
  }
  try {
    setLoading(true, dispatch);
    const response = await clientAxios.get(END_POINT_AUTH);
    dispatch({ type: SET_USER, payload: response.data.user });
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error userAuth =>", error.response);
    handleError({ error: true, errorMsn: error.response.data.msn }, dispatch);
  }
};
