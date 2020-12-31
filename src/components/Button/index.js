import PropTypes from "prop-types";

const Button = ({ text, type, action, style }) => {
  return (
    <button
      style={style ? style : {}}
      className={"buttonGlobal"}
      type={type}
      onClick={
        action
          ? () => action()
          : () => {
              return;
            }
      }
    >
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.func,
  style: PropTypes.object,
};

export default Button;
