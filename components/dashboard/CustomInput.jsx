import config from '@/config.json';

const CustomInput = ({ label, labelClassName, inputClassName, ...inputProps }) => {

  return (
    <div>
      {label && (
        <label
          htmlFor={inputProps.id || inputProps.name}
          className={`block mb-1 text-sm text-right ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        className={`p-2 bg-primary rounded focus:outline-none focus:ring focus:ring-accent  w-full
          ${config.direction}
          ${inputClassName}`
        }
        {...inputProps}
      />
    </div>
  );
};

export default CustomInput;
