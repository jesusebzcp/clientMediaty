import PropTypes from "prop-types";
import { useContext } from "react";
import HeadBase from "../../src/components/HeadBase";
import { StoreContext } from "../../src/flux";
import Login from "../Login";

const Layout = ({ children }) => {
  const { state } = useContext(StoreContext);
  const { authState } = state;
  const { user } = authState;

  return (
    <>
      <HeadBase />

      <div>{user ? children : <Login />}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};
export default Layout;
