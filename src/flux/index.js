import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import authReducer, { INITIAL_STATE_AUTH } from "./auth/reducer";
import conferenceReducer, {
  INITIAL_STATE_CONFERENCE,
} from "./conference/reducer";

export const StoreContext = createContext({});

const Store = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE_AUTH);
  const [conferenceState, conferenceDispatch] = useReducer(
    conferenceReducer,
    INITIAL_STATE_CONFERENCE
  );

  return (
    <StoreContext.Provider
      value={{
        state: { authState, conferenceState },
        authDispatch,
        conferenceDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
Store.propTypes = {
  children: PropTypes.object,
};
export default Store;
