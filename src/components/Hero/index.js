import PropTypes from "prop-types";
import util from "../../util";

const Hero = ({ title }) => {
  return (
    <div className="hero">
      <img src={"/static/assets/images/home.jpg"} />
      <div className="containerCallAction">
        <h2>{util.capitalize(title)}</h2>

        <a
          href="https://mediaty.co/"
          target="_blank"
          rel="noopener noreferrer"
          className={"linkPress"}
        >
          Visitar sitio oficial
        </a>
      </div>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
};

export default Hero;
