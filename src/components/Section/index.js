import PropTypes from "prop-types";

const Section = ({ children }) => {
  return (
    <div className="container">
      <div className="column1" />
      <div className="column2">{children}</div>
      <div className="column3" />
    </div>
  );
};
Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Section;
