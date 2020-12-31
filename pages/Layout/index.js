import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import HeadBase from "../../src/components/HeadBase";
import Loading from "../../src/components/Loading";
import NavBar from "../../src/components/NavBar";

import { StoreContext } from "../../src/flux";
import { userAuth } from "../../src/flux/auth/actions";
import Login from "../Login";

const Layout = ({ children }) => {
  const { state, authDispatch } = useContext(StoreContext);
  const { authState } = state;
  const { user } = authState;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      userAuth(token, authDispatch);
    }
  }, [authDispatch]);

  return (
    <>
      {authState.loading ? (
        <Loading />
      ) : (
        <>
          {user ? (
            <>
              <NavBar />
              <div className="layout">{children}</div>
            </>
          ) : (
            <Login />
          )}
        </>
      )}
      <HeadBase />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};
export default Layout;
