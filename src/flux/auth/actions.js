export const handleError = (payload, dispatch) => {
  dispatch({ type: LOADING, payload });
};
export const setLoading = (loading, dispatch) => {
  dispatch({ type: LOADING, payload: loading });
};
