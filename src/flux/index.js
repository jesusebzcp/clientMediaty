import React, { createContext, useReducer } from "react";
import authReducer, { INITIAL_STATE_AUTH } from "./auth/reducer";

export const StoreContext = createContext({});

export default ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE_AUTH);

  return (
    <StoreContext.Provider
      value={{
        state: { authState },
        authDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
