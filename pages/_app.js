import "../src/styles/main.css";
import Store from "../src/flux";
import PropTypes from "prop-types";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Store>
        <Component {...pageProps} />
      </Store>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
