import PropTypes from "prop-types";

const Hero = ({ title }) => {
  return (
    <div className="hero">
      <h2>{title}</h2>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
};

export default Hero;
