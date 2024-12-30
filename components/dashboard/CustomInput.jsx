import React from 'react';

const CustomInput = ({ label, labelClassName, inputClassName, ...inputProps }) => {
  return (
    <>
      {label && (
        <label
          htmlFor={inputProps.id || inputProps.name}
          className={`block mb-1 text-sm text-right ${labelClassName}`} // Align label to the right
        >
          {label}
        </label>
      )}
      <input
        className={`p-2 bg-primary rounded focus:outline-none focus:ring focus:ring-accent rtl w-full ${inputClassName}`}
        {...inputProps}
      />
    </>
  );
};

export default CustomInput;
