import PropTypes from "prop-types";

const Error = ({ msn, error }) => {
  return (
    <>
      {error && (
        <div className="containerError">
          <span>{msn ? msn : "Ocurrió algo inesperado"}</span>
        </div>
      )}
    </>
  );
};
Error.propTypes = {
  msn: PropTypes.string,
  error: PropTypes.bool,
};
export default Error;
