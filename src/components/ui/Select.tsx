import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectVariant = 'default' | 'error' | 'success' | 'warning';

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  variant?: SelectVariant;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Option[];
  placeholder?: string;
};

const variantClasses: Record<SelectVariant, string> = {
  default: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
  error: 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
  success: 'border-green-300 text-green-900 placeholder-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500',
  warning: 'border-yellow-300 text-yellow-900 placeholder-yellow-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500',
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = '',
      variant = 'default',
      label,
      error,
      helperText,
      fullWidth = false,
      options,
      placeholder,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || React.useId();
    const variantClass = variantClasses[variant] || variantClasses.default;
    const hasError = variant === 'error' || !!error;
    
    const selectClasses = twMerge(
      'block w-full rounded-md shadow-sm sm:text-sm',
      'disabled:bg-gray-50 disabled:text-gray-500',
      'pr-10',
      hasError ? variantClasses.error : variantClass,
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : 'w-full sm:max-w-md'}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            required={required}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {helperText && !hasError && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {hasError && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
