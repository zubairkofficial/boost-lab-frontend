# BOOSTLAB Font & Styling Configuration Guide

## 🎨 Font Configuration

### Primary Font: Unbounded
- **Font Family**: `font-font` (Unbounded, Arial, sans-serif)
- **Weights Available**: 200, 300, 400, 500, 600, 700, 800, 900
- **Usage**: Applied globally to all text elements

### Typography Scale
```css
/* Headings */
h1, .h1 → text-4xl md:text-5xl lg:text-6xl font-bold
h2, .h2 → text-3xl md:text-4xl lg:text-5xl font-semibold  
h3, .h3 → text-2xl md:text-3xl lg:text-4xl font-semibold
h4, .h4 → text-xl md:text-2xl lg:text-3xl font-medium
h5, .h5 → text-lg md:text-xl lg:text-2xl font-medium
h6, .h6 → text-base md:text-lg lg:text-xl font-medium

/* Body Text */
p, .text-body → text-sm md:text-base lg:text-lg font-normal
.text-caption → text-xs md:text-sm font-normal
```

## 🌈 Color Palette

### Primary Colors
```css
primary: '#ffffff' (White)
```

### Cyber Theme Colors
```css
'sky-blue': '[#8ef0f4]'
'cyber-blue': '#00ffff'
'cyber-teal': '#008080'
'cyber-orange': '#ff6600'
'cyber-yellow': '#ffcc00'
'dark-blue': '#0a0a1a'
'dark-grey': '#1a1a2e'
'neon-cyan': '#00d4ff'
'portal-orange': '#ff4500'
'portal-yellow': '#ffd700'
```

### UI Colors
```css
'ui-dark': '#0f0f23'
'ui-medium': '#1e1e3f'
'ui-light': '#2d2d5f'
'accent-blue': '#4fc3f7'
'accent-green': '#4caf50'
'accent-purple': '#9c27b0'
```

## 🎭 Gradients

### Professional Gradients
```css
'gradient-primary': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)'
'gradient-cyber': 'linear-gradient(45deg, #00ffff, #008080, #00d4ff)'
'gradient-portal': 'linear-gradient(45deg, #ff4500, #ffd700, #ff6600)'
```

### Background Patterns
```css
'cyber-pattern': 'linear-gradient(45deg, #0a0a1a 25%, transparent 25%)...'
'grid-pattern': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)...'
```

## ✨ Animations

### Available Animations
```css
'glow': 'glow 2s ease-in-out infinite alternate'
'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
'float': 'float 6s ease-in-out infinite'
'portal-spin': 'portal-spin 8s linear infinite'
'cyber-flicker': 'cyber-flicker 0.15s infinite linear'
'wave': 'wave 2s ease-in-out infinite'
'slide-up': 'slide-up 0.5s ease-out'
'slide-down': 'slide-down 0.5s ease-out'
'fade-in': 'fade-in 0.5s ease-out'
'scale-in': 'scale-in 0.5s ease-out'
```

## 🎯 Usage Examples

### Typography Examples
```jsx
// Headings
<h1 className="text-white">Main Title</h1>
<h2 className="text-cyber-blue">Section Title</h2>
<h3 className="text-neon-cyan">Subsection</h3>

// Body Text
<p className="text-gray-300">Regular paragraph text</p>
<p className="text-caption text-gray-400">Small caption text</p>
```

### Background Examples
```jsx
// Gradient Backgrounds
<div className="bg-gradient-primary">Primary gradient</div>
<div className="bg-gradient-cyber">Cyber gradient</div>
<div className="bg-gradient-portal">Portal gradient</div>

// Pattern Backgrounds
<div className="bg-cyber-pattern">Cyber pattern</div>
<div className="bg-grid-pattern">Grid pattern</div>
```

### Color Examples
```jsx
// Text Colors
<span className="text-cyber-blue">Cyber Blue Text</span>
<span className="text-neon-cyan">Neon Cyan Text</span>
<span className="text-portal-orange">Portal Orange Text</span>

// Background Colors
<div className="bg-dark-blue">Dark Blue Background</div>
<div className="bg-ui-medium">UI Medium Background</div>
<div className="bg-cyber-teal">Cyber Teal Background</div>
```

### Animation Examples
```jsx
// Glowing Elements
<div className="animate-glow">Glowing Element</div>
<div className="animate-pulse-slow">Slow Pulse</div>

// Floating Elements
<div className="animate-float">Floating Element</div>
<div className="animate-portal-spin">Spinning Portal</div>

// Entrance Animations
<div className="animate-slide-up">Slide Up Animation</div>
<div className="animate-fade-in">Fade In Animation</div>
```

### Shadow Examples
```jsx
// Cyber Shadows
<div className="shadow-cyber">Cyber Glow Shadow</div>
<div className="shadow-cyber-lg">Large Cyber Glow</div>

// Portal Shadows
<div className="shadow-portal">Portal Glow Shadow</div>
<div className="shadow-portal-lg">Large Portal Glow</div>
```

### Backdrop Blur Examples
```jsx
// Blur Effects
<div className="backdrop-blur-sm">Small Blur</div>
<div className="backdrop-blur-md">Medium Blur</div>
<div className="backdrop-blur-xl">Extra Large Blur</div>
```

## 📱 Responsive Design

### Breakpoints
```css
'xs': '475px'
'sm': '640px'
'md': '768px'
'lg': '1024px'
'xl': '1280px'
'2xl': '1536px'
'3xl': '1600px'
'4xl': '1920px'
```

### Responsive Typography
```jsx
// Responsive text sizes
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Heading
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Responsive paragraph
</p>
```

## 🎨 Component Examples

### Card Component
```jsx
<div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-cyber">
  <h3 className="text-2xl font-semibold text-white mb-4">Card Title</h3>
  <p className="text-gray-300 text-body">Card content with professional styling</p>
</div>
```

### Button Component
```jsx
<button className="bg-gradient-cyber text-white font-font font-semibold px-6 py-3 rounded-lg shadow-cyber hover:shadow-cyber-lg transition-all duration-300 animate-glow">
  Cyber Button
</button>
```

### Navigation Component
```jsx
<nav className="bg-dark-blue/80 backdrop-blur-lg border-b border-cyber-blue/20">
  <div className="container mx-auto px-4 py-4">
    <h1 className="text-2xl font-bold text-cyber-blue">BOOSTLAB</h1>
  </div>
</nav>
```

## 🚀 Best Practices

1. **Always use `font-font` class** for consistent typography
2. **Use semantic HTML** with proper heading hierarchy
3. **Leverage responsive classes** for mobile-first design
4. **Combine colors with animations** for cyber aesthetic
5. **Use backdrop blur** for modern glass morphism effects
6. **Apply shadows strategically** for depth and glow effects
7. **Maintain contrast** for accessibility

## 🎯 Quick Reference

### Font Classes
- `font-font` - Unbounded font family
- `font-cyber` - Orbitron (for special cyber elements)
- `font-futura` - Futura font
- `font-inter` - Inter font
- `font-roboto` - Roboto font

### Common Color Combinations
- `text-white bg-dark-blue` - High contrast
- `text-cyber-blue bg-ui-dark` - Cyber theme
- `text-neon-cyan bg-gradient-primary` - Gradient with neon
- `text-portal-orange bg-dark-grey` - Portal theme

### Animation Combinations
- `animate-glow shadow-cyber` - Glowing cyber element
- `animate-float backdrop-blur-md` - Floating glass element
- `animate-fade-in animate-slide-up` - Entrance animation 