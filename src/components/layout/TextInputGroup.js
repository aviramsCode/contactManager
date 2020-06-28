import React from "react";
import PropTypes from "prop-types";
//classnames - npm i classnames -> a module that allow us to
import classnames from "classnames";

// TextInputGroup is a functional component,
// recives props
// returns a form section depending on the input
const TextInputGroup = ({
  //destructuring, insted of writing "props.name" (etc..) at every filed
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  //classnames method recives 2 parameters
  //1.any classes that we want to apply by default, no matter what is the condition
  //2.an object that holdes the class name that we want, and the condition that it depends on (error in this case)
  //so if error is true the class name will be first argument that classnames recives
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {/* if the error is true the div will be shown */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

//initialize default value for type prop
TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
