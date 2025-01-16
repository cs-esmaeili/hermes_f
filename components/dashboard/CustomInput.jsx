import React, { forwardRef } from 'react';

const CustomInput = forwardRef(
  (
    {
      leftLabel,
      rightLabel,
      leftLabelClassName,
      rightLabelClassName,
      inputClassName,
      containerClassName,
      onLeftLabelClick,
      onRightLabelClick,
      placeholder, // دریافت placeholder
      ...inputProps
    },
    ref // Forwarded ref
  ) => {
    return (
      <div className={containerClassName}>
        <div className={`flex justify-between ${!leftLabel ? 'justify-end' : ' mb-1'}`}>
          {leftLabel && (
            <label
              htmlFor={inputProps.id || inputProps.name}
              className={`text-sm cursor-pointer mr-auto ${leftLabelClassName}`}
              onClick={onLeftLabelClick}
            >
              {leftLabel}
            </label>
          )}
          {rightLabel && (
            <label
              htmlFor={inputProps.id || inputProps.name}
              className={`text-sm cursor-pointer text-right ml-auto ${rightLabelClassName}`}
              onClick={onRightLabelClick}
            >
              {rightLabel}
            </label>
          )}
        </div>
        <input
          ref={ref} // Attach the ref to the actual input element
          placeholder={placeholder} // استفاده از placeholder
          className={`p-2 bg-primary rounded-md focus:outline-none focus:ring focus:ring-accent w-full
            ${process.env.NEXT_PUBLIC_DIRECTION}
            ${inputClassName}`}
          {...inputProps}
        />
      </div>
    );
  }
);

export default CustomInput;
