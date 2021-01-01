import clientAxios from "../../config/axios";
import {
  END_POINT_CONFERENCE,
  END_POINT_CREATE_CONFERENCE,
} from "../../constants";
import {
  HANDLE_ERROR,
  LOADING,
  GET_CONFERENCES,
  ADD_CONFERENCES,
} from "./types";
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

export const getConferences = async (dispatch) => {
  try {
    const res = await clientAxios.get(END_POINT_CONFERENCE);

    dispatch({ type: GET_CONFERENCES, payload: res.data });
  } catch (error) {
    if (error && error.response.status === 401) {
      handleError(
        {
          error: true,
          errorMsn: "Su sesión expiro",
        },
        dispatch
      );
    }
    handleError(
      {
        error: true,
        errorMsn: "Ocurrió un error al traer las conferencia",
      },
      dispatch
    );
  }
};
export const createConference = async (conference, dispatch) => {
  console.log("conference =>", conference);
  try {
    setLoading(true, dispatch);
    const res = await clientAxios.post(END_POINT_CREATE_CONFERENCE, conference);
    console.log("response =>", res);
    dispatch({ type: ADD_CONFERENCES, payload: res.data.conference });
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error:createConference", error && error.response.status);
    if (error && error.response.status === 401) {
      handleError(
        {
          error: true,
          errorMsn: "Su sesión expiro",
        },
        dispatch
      );
    }
    handleError(
      {
        error: true,
        errorMsn: "Ocurrió un error al crear la conferencia",
      },
      dispatch
    );
  }
};
export const editConference = async (conference, dispatch) => {
  console.log("edi ====>", conference);
  try {
    setLoading(true, dispatch);
    const res = await clientAxios.put(END_POINT_CONFERENCE, conference);
    console.log("res =>", res);
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error:editConference =>", error.response);
  }
};
