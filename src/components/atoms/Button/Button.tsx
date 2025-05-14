import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  darkMode = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    ghost: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const darkModeStyles = darkMode ? 'dark:bg-gray-800 dark:text-white' : '';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantStyles[variant],
        sizeStyles[size],
        darkModeStyles,
        widthStyle,
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
