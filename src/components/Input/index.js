import PropTypes from "prop-types";

const Input = ({ placeholder, onChange, value, type, style, name, label }) => {
  const defaultStyles = {
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0",
  };

  return (
    <div style={style ? { defaultStyles, ...style } : defaultStyles}>
      {label && <label className="labelInput">{placeholder}</label>}

      <input
        className="inputGlobal"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange
            ? onChange(
                e.target.name,
                type === "number" ? Number(e.target.value) : e.target.value
              )
            : console.log("e =>", e)
        }
        type={type}
        name={name}
      />
    </div>
  );
};
Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.bool,
};
export default Input;
