import React from 'react';
import { H1, H2, H3, H4, H5, H6, BodyText, Caption, CyberText, GradientText, GlowText, FlickerText } from '../components/ui/typography';

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyber-blue/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-neon-cyan/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-portal-orange/10 rounded-full blur-3xl animate-portal-spin"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <H1 className="text-white mb-4 animate-fade-in">
            <GradientText gradient="cyber">BOOSTLAB</GradientText> Style Guide
          </H1>
          <BodyText className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive guide for using the Unbounded font family and all professional styling configurations
          </BodyText>
        </div>

        {/* Typography Section */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Typography System</H2>
          
          <div className="grid gap-8">
            {/* Headings */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <H3 className="text-white mb-6">Heading Hierarchy</H3>
              <div className="space-y-4">
                <H1 className="text-white">Heading 1 - Main Title</H1>
                <H2 className="text-cyber-blue">Heading 2 - Section Title</H2>
                <H3 className="text-neon-cyan">Heading 3 - Subsection</H3>
                <H4 className="text-portal-orange">Heading 4 - Card Title</H4>
                <H5 className="text-cyber-yellow">Heading 5 - Small Title</H5>
                <H6 className="text-accent-blue">Heading 6 - Micro Title</H6>
              </div>
            </div>

            {/* Body Text */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <H3 className="text-white mb-6">Body Text Variants</H3>
              <div className="space-y-4">
                <BodyText className="text-gray-300">
                  This is the standard body text using the Unbounded font family. It provides excellent readability 
                  and maintains the professional cyber aesthetic throughout the application.
                </BodyText>
                <Caption className="text-gray-400">
                  This is caption text for smaller, secondary information like metadata, timestamps, or helper text.
                </Caption>
              </div>
            </div>

            {/* Special Text Styles */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <H3 className="text-white mb-6">Special Text Styles</H3>
              <div className="space-y-4">
                <div>
                  <CyberText className="text-cyber-blue text-xl">Cyber Text Style</CyberText>
                  <Caption className="text-gray-400 mt-1">Uses Orbitron font for special cyber elements</Caption>
                </div>
                <div>
                  <GradientText gradient="cyber" className="text-2xl">Gradient Cyber Text</GradientText>
                  <Caption className="text-gray-400 mt-1">Text with cyber gradient background</Caption>
                </div>
                <div>
                  <GradientText gradient="portal" className="text-2xl">Gradient Portal Text</GradientText>
                  <Caption className="text-gray-400 mt-1">Text with portal gradient background</Caption>
                </div>
                <div>
                  <GlowText className="text-neon-cyan text-xl">Glowing Text Effect</GlowText>
                  <Caption className="text-gray-400 mt-1">Text with pulsing glow animation</Caption>
                </div>
                <div>
                  <FlickerText className="text-cyber-orange text-xl">Flickering Text</FlickerText>
                  <Caption className="text-gray-400 mt-1">Text with cyber flicker animation</Caption>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Color Palette</H2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cyber Colors */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <H4 className="text-white mb-4">Cyber Theme</H4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyber-blue rounded-full shadow-cyber"></div>
                  <span className="text-gray-300">cyber-blue</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-neon-cyan rounded-full shadow-cyber"></div>
                  <span className="text-gray-300">neon-cyan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyber-teal rounded-full"></div>
                  <span className="text-gray-300">cyber-teal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyber-orange rounded-full"></div>
                  <span className="text-gray-300">cyber-orange</span>
                </div>
              </div>
            </div>

            {/* Portal Colors */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <H4 className="text-white mb-4">Portal Theme</H4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-portal-orange rounded-full shadow-portal"></div>
                  <span className="text-gray-300">portal-orange</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-portal-yellow rounded-full shadow-portal"></div>
                  <span className="text-gray-300">portal-yellow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyber-yellow rounded-full"></div>
                  <span className="text-gray-300">cyber-yellow</span>
                </div>
              </div>
            </div>

            {/* UI Colors */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <H4 className="text-white mb-4">UI Colors</H4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dark-blue rounded-full"></div>
                  <span className="text-gray-300">dark-blue</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dark-grey rounded-full"></div>
                  <span className="text-gray-300">dark-grey</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-ui-dark rounded-full"></div>
                  <span className="text-gray-300">ui-dark</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-ui-medium rounded-full"></div>
                  <span className="text-gray-300">ui-medium</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Section */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Gradient Backgrounds</H2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-32 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <H4 className="text-white">Primary Gradient</H4>
            </div>
            <div className="h-32 bg-gradient-cyber rounded-2xl flex items-center justify-center">
              <H4 className="text-white">Cyber Gradient</H4>
            </div>
            <div className="h-32 bg-gradient-portal rounded-2xl flex items-center justify-center">
              <H4 className="text-white">Portal Gradient</H4>
            </div>
          </div>
        </section>

        {/* Animation Section */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Animations</H2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-cyber-blue rounded-full mx-auto mb-4 animate-glow"></div>
              <H5 className="text-white">Glow Effect</H5>
            </div>
            
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-neon-cyan rounded-full mx-auto mb-4 animate-float"></div>
              <H5 className="text-white">Float Animation</H5>
            </div>
            
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-portal-orange rounded-full mx-auto mb-4 animate-portal-spin"></div>
              <H5 className="text-white">Portal Spin</H5>
            </div>
            
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-cyber-teal rounded-full mx-auto mb-4 animate-pulse-slow"></div>
              <H5 className="text-white">Slow Pulse</H5>
            </div>
            
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-cyber-yellow rounded-full mx-auto mb-4 animate-cyber-flicker"></div>
              <H5 className="text-white">Cyber Flicker</H5>
            </div>
            
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-accent-blue rounded-full mx-auto mb-4 animate-wave"></div>
              <H5 className="text-white">Wave Effect</H5>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Component Examples</H2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Example */}
            <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-cyber">
              <H3 className="text-white mb-4">Professional Card</H3>
              <BodyText className="text-gray-300 mb-4">
                This card demonstrates the glass morphism effect with backdrop blur and cyber styling.
              </BodyText>
              <button className="bg-gradient-cyber text-white font-font font-semibold px-6 py-3 rounded-lg shadow-cyber hover:shadow-cyber-lg transition-all duration-300">
                Cyber Button
              </button>
            </div>

            {/* Navigation Example */}
            <div className="bg-dark-blue/80 backdrop-blur-lg border border-cyber-blue/20 rounded-2xl p-8">
              <H3 className="text-cyber-blue mb-4">Navigation Style</H3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-font">Home</span>
                  <span className="text-gray-400 font-font">About</span>
                  <span className="text-gray-400 font-font">Services</span>
                  <span className="text-gray-400 font-font">Contact</span>
                </div>
                <div className="w-full h-px bg-cyber-blue/20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Typography */}
        <section className="mb-16">
          <H2 className="text-cyber-blue mb-8">Responsive Typography</H2>
          
          <div className="bg-ui-medium/50 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <H3 className="text-white mb-6">Responsive Text Sizes</H3>
            <div className="space-y-4">
              <H1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
                Responsive Heading
              </H1>
              <BodyText className="text-sm md:text-base lg:text-lg text-gray-300">
                This text demonstrates responsive sizing that adapts to different screen sizes.
                On mobile it's smaller, on tablet it's medium, and on desktop it's larger.
              </BodyText>
              <Caption className="text-xs md:text-sm text-gray-400">
                Caption text also scales responsively for optimal readability across devices.
              </Caption>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <BodyText className="text-gray-400">
            BOOSTLAB Style Guide - Professional Typography & Styling System
          </BodyText>
        </footer>
      </div>
    </div>
  );
} 