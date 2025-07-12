import React from "react";
import ValidationError from "./ValidationError";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  unit,
  ...rest
}) => (
  <div className="form-group col-md-12" style={{ position: "relative" }}>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={unit ? { paddingRight: 50 } : {}}
      {...rest}
    />
    {unit && (
      <span
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#888",
          fontWeight: 600,
          pointerEvents: "none",
        }}
      >
        {unit}
      </span>
    )}
    <ValidationError error={error} />
  </div>
);

export default FormInput;
