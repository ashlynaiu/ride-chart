import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaVariant = 'default' | 'error' | 'success' | 'warning';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: TextareaVariant;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  rows?: number;
};

const variantClasses: Record<TextareaVariant, string> = {
  default: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
  error: 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500',
  success: 'border-green-300 text-green-900 placeholder-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500',
  warning: 'border-yellow-300 text-yellow-900 placeholder-yellow-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500',
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      variant = 'default',
      label,
      error,
      helperText,
      fullWidth = false,
      rows = 3,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const variantClass = variantClasses[variant] || variantClasses.default;
    const hasError = variant === 'error' || !!error;
    
    const textareaClasses = twMerge(
      'block w-full rounded-md shadow-sm sm:text-sm',
      'disabled:bg-gray-50 disabled:text-gray-500',
      hasError ? variantClasses.error : variantClass,
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
        <div className="mt-1">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            className={textareaClasses}
            {...props}
          />
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

Textarea.displayName = 'Textarea';

export default Textarea;
