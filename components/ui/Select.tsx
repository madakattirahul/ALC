import React from 'react';
import Tooltip from './Tooltip';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
  error?: string;
  tooltip?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, options, error, tooltip, ...props }) => {
  const baseClasses = "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md border";
  const errorClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
  const defaultClasses = "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div>
      <div className="flex items-center">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <select
        id={id}
        className={`${baseClasses} ${error ? errorClasses : defaultClasses}`}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={props.required}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
