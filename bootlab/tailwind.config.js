/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Cyber Colors
                'primary':'#8ef0f4',
                'cyber-blue': '#00ffff',
                'cyber-teal': '#008080',
                'cyber-orange': '#ff6600',
                'cyber-yellow': '#ffcc00',
                'dark-blue': '#0a0a1a',
                'dark-grey': '#1a1a2e',
                'neon-cyan': '#00d4ff',
                'portal-orange': '#ff4500',
                'portal-yellow': '#ffd700',

                // Professional Gradients
                'gradient-primary': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
                'gradient-cyber': 'linear-gradient(45deg, #00ffff, #008080, #00d4ff)',
                'gradient-portal': 'linear-gradient(45deg, #ff4500, #ffd700, #ff6600)',

                // UI Colors
                'ui-dark': '#0f0f23',
                'ui-medium': '#1e1e3f',
                'ui-light': '#2d2d5f',
                'accent-blue': '#4fc3f7',
                'accent-green': '#4caf50',
                'accent-purple': '#9c27b0',
            },
            fontFamily: {
                'cyber': ['Orbitron', 'monospace'],
                'futura': ['Futura', 'Arial', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
                '8xl': ['6rem', { lineHeight: '1' }],
                '9xl': ['8rem', { lineHeight: '1' }],
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'portal-spin': 'portal-spin 8s linear infinite',
                'cyber-flicker': 'cyber-flicker 0.15s infinite linear',
                'wave': 'wave 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'slide-down': 'slide-down 0.5s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'scale-in': 'scale-in 0.5s ease-out',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
                    '100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'portal-spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'cyber-flicker': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                wave: {
                    '0%, 100%': { transform: 'scaleY(1)' },
                    '50%': { transform: 'scaleY(1.5)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'cyber-pattern': 'linear-gradient(45deg, #0a0a1a 25%, transparent 25%), linear-gradient(-45deg, #0a0a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0a0a1a 75%), linear-gradient(-45deg, transparent 75%, #0a0a1a 75%)',
                'grid-pattern': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '24px',
                '3xl': '40px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'cyber': '0 0 20px rgba(0, 255, 255, 0.3)',
                'cyber-lg': '0 0 40px rgba(0, 255, 255, 0.4)',
                'portal': '0 0 30px rgba(255, 69, 0, 0.5)',
                'portal-lg': '0 0 60px rgba(255, 69, 0, 0.6)',
            },
            screens: {
                'xs': '475px',
                '3xl': '1600px',
                '4xl': '1920px',
            },
        },
    },
    plugins: [],
}