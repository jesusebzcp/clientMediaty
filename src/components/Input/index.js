import PropTypes from "prop-types";

const Input = ({ placeholder, onChange, value, type, style, name }) => {
  return (
    <input
      style={style ? style : {}}
      className="inputGlobal"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      type={type}
      name={name}
    />
  );
};
Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
};
export default Input;
