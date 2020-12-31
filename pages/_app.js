import "../src/styles/main.css";
import Store from "../src/flux";
import PropTypes from "prop-types";
import Layout from "./Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Store>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Store>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
