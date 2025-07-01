import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
  hoverEffect?: 'none' | 'shadow' | 'scale' | 'grow';
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  rounded = 'lg',
  shadow = 'md',
  hoverEffect = 'none',
  ...props
}) => {
  const baseClasses = 'overflow-hidden transition-all duration-200';

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg',
    '2xl': 'shadow-xl',
    inner: 'shadow-inner',
  };

  const hoverClasses = {
    none: '',
    shadow: 'hover:shadow-lg',
    scale: 'hover:scale-[1.02]',
    grow: 'hover:shadow-lg hover:scale-[1.01]',
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    roundedClasses[rounded],
    shadow !== 'none' && shadowClasses[shadow],
    hoverEffect !== 'none' && hoverClasses[hoverEffect],
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  withBorder = false,
}) => {
  return (
    <div
      className={twMerge(
        'px-4 py-5 sm:px-6',
        withBorder && 'border-b border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};

type CardBodyProps = {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div className={twMerge(paddingClasses[padding], className)}>{children}</div>
  );
};

type CardFooterProps = {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  withBorder = true,
}) => {
  return (
    <div
      className={twMerge(
        'px-4 py-4 sm:px-6',
        withBorder && 'border-t border-gray-200',
        'bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };
