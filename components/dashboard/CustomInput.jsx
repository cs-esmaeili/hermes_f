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
      placeholder,
      leftError,   // new prop for left side error message
      rightError,  // new prop for right side error message
      ...inputProps
    },
    ref
  ) => {
    // If any error exists, apply error styling to the input field.
    const hasError = leftError || rightError;
    return (
      <div className={containerClassName}>
        {(leftLabel || rightLabel) &&
          <div className="flex justify-between mb-1">
            <div className="flex flex-col">
              {leftLabel && (
                <label
                  htmlFor={inputProps.id || inputProps.name}
                  className={`text-sm cursor-pointer mr-auto ${leftLabelClassName}`}
                  onClick={onLeftLabelClick}
                >
                  {leftLabel}
                </label>
              )}
              {leftError && (
                <span className="text-red-600 text-xs italic">
                  {leftError}
                </span>
              )}
            </div>
            <div className="flex flex-col items-end">
              {rightLabel && (
                <label
                  htmlFor={inputProps.id || inputProps.name}
                  className={`text-sm cursor-pointer ml-auto ${rightLabelClassName}`}
                  onClick={onRightLabelClick}
                >
                  {rightLabel}
                </label>
              )}
              {rightError && (
                <span className="text-red-600 text-xs italic">
                  {rightError}
                </span>
              )}
            </div>
          </div>
        }
        <input
          ref={ref}
          placeholder={placeholder}
          className={`p-2 bg-primary rounded-md focus:outline-none focus:ring focus:ring-accent w-full 
            ${process.env.NEXT_PUBLIC_DIRECTION} ${inputClassName} ${hasError ? 'border border-red-500' : ''
            }`}
          {...inputProps}
        />
      </div>
    );
  }
);

export default CustomInput;
