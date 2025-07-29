import React, { type JSX } from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Heading Components
export const H1: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h1', ...props }) => (
  <Component className={`text-4xl md:text-5xl lg:text-6xl font-bold font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h2', ...props }) => (
  <Component className={`text-3xl md:text-4xl lg:text-5xl font-semibold font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component className={`text-2xl md:text-3xl lg:text-4xl font-semibold font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const H4: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h4', ...props }) => (
  <Component className={`text-xl md:text-2xl lg:text-3xl font-medium font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const H5: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h5', ...props }) => (
  <Component className={`text-lg md:text-xl lg:text-2xl font-medium font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

export const H6: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h6', ...props }) => (
  <Component className={`text-base md:text-lg lg:text-xl font-medium font-font leading-tight ${className}`} {...props}>
    {children}
  </Component>
);

// Body Text Components
export const BodyText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'p', ...props }) => (
  <Component className={`text-sm md:text-base lg:text-lg font-normal font-font leading-relaxed ${className}`} {...props}>
    {children}
  </Component>
);

export const Caption: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'p', ...props }) => (
  <Component className={`text-xs md:text-sm font-normal font-font leading-relaxed ${className}`} {...props}>
    {children}
  </Component>
);

// Special Text Components
export const CyberText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`font-cyber ${className}`} {...props}>
    {children}
  </Component>
);

export const FuturaText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`font-futura ${className}`} {...props}>
    {children}
  </Component>
);

// Link Components
export const TextLink: React.FC<TypographyProps & { href?: string; to?: string }> = ({ 
  children, 
  className = '', 
  as: Component = 'a', 
  href,
  to,
  ...props 
}) => (
  <Component 
    className={`text-white hover:text-cyber-blue font-semibold transition-colors font-font ${className}`}
    href={href}
    to={to}
    {...props}
  >
    {children}
  </Component>
);

// Gradient Text Components
export const GradientText: React.FC<TypographyProps & { gradient?: 'cyber' | 'portal' | 'primary' }> = ({ 
  children, 
  className = '', 
  gradient = 'cyber',
  as: Component = 'span', 
  ...props 
}) => {
  const gradientClasses = {
    cyber: 'bg-gradient-cyber bg-clip-text text-transparent',
    portal: 'bg-gradient-portal bg-clip-text text-transparent',
    primary: 'bg-gradient-primary bg-clip-text text-transparent'
  };

  return (
    <Component className={`font-font ${gradientClasses[gradient]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

// Animated Text Components
export const GlowText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`font-font animate-glow ${className}`} {...props}>
    {children}
  </Component>
);

export const FlickerText: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component className={`font-font animate-cyber-flicker ${className}`} {...props}>
    {children}
  </Component>
);

// Export all components
export default {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  BodyText,
  Caption,
  CyberText,
  FuturaText,
  TextLink,
  GradientText,
  GlowText,
  FlickerText
}; 