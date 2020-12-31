import createReducer from "../createReducer";
import { LOADING, SET_USER, HANDLE_ERROR } from "./types";

export const INITIAL_STATE_AUTH = {
  c: false,
  error: false,
  loading: false,
  user: null,
};
const handleError = (state, action) => {
  const { error, errorMsn } = action.payload;
  return {
    ...state,
    error,
    errorMsn,
  };
};

const setLoading = (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
};
const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};

export default createReducer(INITIAL_STATE_AUTH, {
  [HANDLE_ERROR]: handleError,
  [LOADING]: setLoading,
  [SET_USER]: setUser,
});
