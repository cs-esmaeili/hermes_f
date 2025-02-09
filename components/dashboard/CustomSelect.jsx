import React, { forwardRef } from 'react';

const CustomSelect = forwardRef(
  (
    {
      leftLabel,
      rightLabel,
      leftLabelClassName,
      rightLabelClassName,
      selectClassName,
      containerClassName,
      onLeftLabelClick,
      onRightLabelClick,
      options,       // آرایه‌ای از گزینه‌ها به فرم [{ value: '', label: '' }]
      placeholder,   // متن placeholder برای اولین گزینه (غیر قابل انتخاب)
      ...selectProps
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        <div className={`flex justify-between ${!leftLabel ? 'justify-end' : 'mb-1'}`}>
          {leftLabel && (
            <label
              htmlFor={selectProps.id || selectProps.name}
              className={`text-sm cursor-pointer mr-auto ${leftLabelClassName}`}
              onClick={onLeftLabelClick}
            >
              {leftLabel}
            </label>
          )}
          {rightLabel && (
            <label
              htmlFor={selectProps.id || selectProps.name}
              className={`text-sm cursor-pointer text-right ml-auto ${rightLabelClassName}`}
              onClick={onRightLabelClick}
            >
              {rightLabel}
            </label>
          )}
        </div>
        <select
          ref={ref}
          placeholder={placeholder}
          className={`p-2 h-10 bg-primary rounded-md focus:outline-none focus:ring focus:ring-accent w-full ${process.env.NEXT_PUBLIC_DIRECTION} ${selectClassName}`}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

export default CustomSelect;
