import React, { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputVariant = 'default' | 'error' | 'success' | 'warning';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const variantClasses: Record<InputVariant, string> = {
  default: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
  error: 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
  success: 'border-green-300 text-green-900 placeholder-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500',
  warning: 'border-yellow-300 text-yellow-900 placeholder-yellow-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      variant = 'default',
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const variantClass = variantClasses[variant] || variantClasses.default;
    const hasError = variant === 'error' || !!error;
    
    const inputClasses = twMerge(
      'block w-full rounded-md shadow-sm sm:text-sm',
      'disabled:bg-gray-50 disabled:text-gray-500',
      hasError ? variantClasses.error : variantClass,
      leftIcon ? 'pl-10' : 'pl-3',
      rightIcon ? 'pr-10' : 'pr-3',
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : 'w-full sm:max-w-md'}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !hasError && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {hasError && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
