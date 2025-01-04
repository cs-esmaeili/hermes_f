
const CustomInput = ({
  leftLabel,
  rightLabel,
  leftLabelClassName,
  rightLabelClassName,
  inputClassName,
  onLeftLabelClick,
  onRightLabelClick,
  ...inputProps
}) => {
  return (
    <div>
      <div className={`flex justify-between mb-1 ${!leftLabel ? 'justify-end' : ''}`}>
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
        className={`p-2 bg-primary rounded focus:outline-none focus:ring focus:ring-accent w-full
          ${process.env.NEXT_PUBLIC_DIRECTION}
          ${inputClassName}`}
        {...inputProps}
      />
    </div>
  );
};

export default CustomInput;
