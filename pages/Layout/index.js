import PropTypes from "prop-types";
import { useContext } from "react";
import HeadBase from "../../src/components/HeadBase";
import Loading from "../../src/components/Loading";

import { StoreContext } from "../../src/flux";
import Login from "../Login";

const Layout = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { authState } = state;
  const { user } = authState;

  return (
    <>
      {authState.loading ? (
        <Loading />
      ) : (
        <>
          <div>{user ? children : <Login />}</div>
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
