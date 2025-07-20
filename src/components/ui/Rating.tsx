import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';

type RatingSize = 'sm' | 'md' | 'lg';
type RatingVariant = 'default' | 'readonly' | 'interactive';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: RatingSize;
  variant?: RatingVariant;
  count?: number;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  showValue?: boolean;
  color?: string;
}

const sizeClasses: Record<RatingSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  size = 'md',
  variant = 'default',
  count = 5,
  className = '',
  label,
  error,
  helperText,
  showValue = false,
  color = 'text-yellow-400',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isInteractive = variant === 'interactive' && !!onChange;
  const displayValue = isHovering && hoverValue !== null ? hoverValue : value;

  const handleClick = (newValue: number) => {
    if (isInteractive) {
      onChange?.(newValue);
    }
  };

  const handleMouseEnter = (newValue: number) => {
    if (isInteractive) {
      setHoverValue(newValue);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverValue(null);
      setIsHovering(false);
    }
  };

  return (
    <div className={twMerge('flex flex-col', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <div className="flex">
          {[...Array(count)].map((_, index) => {
            const ratingValue = index + 1;
            const isFilled = ratingValue <= (displayValue || 0);
            const isHalfFilled =
              ratingValue - 0.5 <= (displayValue || 0) &&
              ratingValue > (displayValue || 0);

            return (
              <div
                key={ratingValue}
                className={`relative ${sizeClasses[size]} ${
                  isInteractive ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleClick(ratingValue)}
                onMouseEnter={() => handleMouseEnter(ratingValue)}
                onMouseLeave={handleMouseLeave}
                role={isInteractive ? 'button' : 'presentation'}
                tabIndex={isInteractive ? 0 : -1}
                onKeyDown={(e) => {
                  if (isInteractive && e.key === 'Enter') {
                    handleClick(ratingValue);
                  }
                }}
              >
                <StarIcon
                  className={`${
                    isFilled || isHalfFilled ? color : 'text-gray-300'
                  } ${sizeClasses[size]}`}
                />
                {isHalfFilled && (
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                    <StarIcon className={`${color} ${sizeClasses[size]}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showValue && (
          <span className="ml-2 text-sm text-gray-500">
            {displayValue.toFixed(1)}
          </span>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Rating;
