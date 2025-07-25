import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  loading?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  loading = false,
  icon
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 
    transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    group
  `

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: `bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan text-black font-bold shadow-lg hover:shadow-cyber-lg
      backdrop-blur-md bg-opacity-70 border border-primary/30
      hover:bg-opacity-90 hover:backdrop-blur-xl
      hover:from-primary/80 hover:via-cyber-blue/80 hover:to-neon-cyan/80
      hover:border-primary/60
      transition-all duration-300`,
    secondary: 'bg-ui-dark/50 border border-primary/20 text-white hover:bg-primary/10 hover:border-primary/40',
    outline: 'border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40'
  }

  const buttonContent = (
    <div className="flex items-center justify-center space-x-2">
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && (
        <span className="group-hover:rotate-12 transition-transform duration-300">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {buttonContent}
    </button>
  )
}

export default Button
