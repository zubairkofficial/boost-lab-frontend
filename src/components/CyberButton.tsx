import React from 'react'

interface CyberButtonProps {
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

const CyberButton: React.FC<CyberButtonProps> = ({
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
    relative inline-flex items-center justify-center font-bold transition-all duration-500 
    transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    group overflow-hidden shadow-lg hover:shadow-2xl
  `

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'text-black font-cyber tracking-wide',
    secondary: 'text-white font-cyber tracking-wide',
    outline: 'text-primary border border-primary/20 hover:bg-primary/10 font-cyber tracking-wide'
  }

  const buttonContent = (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background SVG */}
      <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 256.7392578125 110.1103515625" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="cyber-glow" x="-24.99995398079966" y="-24.99995398079966" width="306.73966575317974" height="160.11030084971395" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.5"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>
            </filter>
            <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8EF0F4" stopOpacity="1"/>
              <stop offset="50%" stopColor="#00FFFF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <g filter="url(#cyber-glow)">
            <path 
              d="M0.8378899419767831 73.68666688758977C1.1296777333290227 50.12490273171251 0.8378899419767831 6.186691143614594 0.8378899419767831 0.8334951258596032H113.65974438024891L125.91473162122688 12.6508956758345H255.9067926435461V109.27692776099987H39.135112553820285L0.8378899419767831 73.68666688758977Z" 
              fill={variant === 'primary' ? 'url(#cyber-gradient)' : 'rgba(142, 240, 244, 0.3)'} 
              fillOpacity={variant === 'primary' ? '1' : '0.3'}
            />
            <path 
              d="M0.8378899419767831 73.68666688758977C1.1296777333290227 50.12490273171251 0.8378899419767831 6.186691143614594 0.8378899419767831 0.8334951258596032H113.65974438024891L125.91473162122688 12.6508956758345H255.9067926435461V109.27692776099987H39.135112553820285L0.8378899419767831 73.68666688758977Z" 
              stroke="url(#cyber-gradient)" 
              strokeWidth="1.66667"
            />
          </g>
        </svg>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-4 h-4 group-hover:scale-110 transition-transform duration-500">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 62.36962890625 66.8134765625" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 3.787632719921875L5.471013951953125 0V23.26464496542969L43.9870539609375 61.123982677734375H62.36962890625L58.64915580273438 66.81358970507813H38.07815531835938L0 27.203636300781252V3.787632719921875Z" 
            fill="url(#cyber-gradient)"
          />
        </svg>
      </div>

      {/* Vertical line accent */}
      <div className="absolute top-0 right-4 w-1 h-full group-hover:scale-y-110 transition-transform duration-500">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 4.376708984375 59.96142578125" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4.25955907389323 3.833608029513889L0 0V58.356119791666664L4.25955907389323 53.6706096733941V3.833608029513889Z" 
            fill="url(#cyber-gradient)"
          />
        </svg>
      </div>

      {/* Additional Vector Image */}
      <div className="absolute top-2 left-4 w-8 h-1 group-hover:scale-x-110 transition-transform duration-500">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 131 10" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 5C0 2.23858 2.23858 0 5 0H126C128.761 0 131 2.23858 131 5C131 7.76142 128.761 10 126 10H5C2.23858 10 0 7.76142 0 5Z" 
            fill="url(#cyber-gradient)"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-3 px-6">
        {loading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && !loading && (
          <span className="group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span className="font-bold text-lg">{children}</span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        style={{ 
          backdropFilter: 'blur(15px)',
          boxShadow: variant === 'primary' ? '0 0 20px rgba(142, 240, 244, 0.3)' : '0 0 10px rgba(142, 240, 244, 0.2)'
        }}
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
      style={{ 
        backdropFilter: 'blur(15px)',
        boxShadow: variant === 'primary' ? '0 0 20px rgba(142, 240, 244, 0.3)' : '0 0 10px rgba(142, 240, 244, 0.2)'
      }}
    >
      {buttonContent}
    </button>
  )
}

export default CyberButton 