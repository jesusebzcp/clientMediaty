import createReducer from "../createReducer";
import {
  LOADING,
  HANDLE_ERROR,
  GET_CONFERENCES,
  ADD_CONFERENCES,
} from "./types";

export const INITIAL_STATE_CONFERENCE = {
  errorMsn: "",
  error: false,
  loading: false,
  all: [],
  conferenceUser: [],
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
const getConferences = (state, action) => {
  return {
    ...state,
    all: action.payload,
  };
};
const addConferences = (state, action) => {
  return {
    ...state,
    all: state.all.concat(action.payload),
  };
};

export default createReducer(INITIAL_STATE_CONFERENCE, {
  [HANDLE_ERROR]: handleError,
  [LOADING]: setLoading,
  [GET_CONFERENCES]: getConferences,
  [ADD_CONFERENCES]: addConferences,
});
