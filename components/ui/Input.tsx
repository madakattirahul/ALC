import React from 'react';
import Tooltip from './Tooltip';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  tooltip?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, tooltip, ...props }) => {
  const baseClasses = "mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm";
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
      <input
        id={id}
        className={`${baseClasses} ${error ? errorClasses : defaultClasses}`}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={props.required}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
