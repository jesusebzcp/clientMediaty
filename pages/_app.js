import "../src/styles/main.css";
import Store from "../src/flux";
import PropTypes from "prop-types";
import Layout from "./Layout";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
