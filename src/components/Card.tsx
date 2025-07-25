import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Robot from '../assets/boosties.png'

const Card = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
      {/* Enhanced Background Image */}
  <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
        style={{
          backgroundImage: 'url(https://static.tildacdn.net/tild3238-3536-4865-a261-333735666135/mob_2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/70 via-dark-grey/60 to-ui-dark/80"></div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-portal-orange/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="relative z-50 flex justify-between items-center p-6 md:p-8">
        {/* Logo */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyber-blue rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white font-cyber">BoostLab</span>
          </div>
        </div>

        {/* Back Button */}
        <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 text-primary bg-white/10 backdrop-blur-sm border border-primary/20 rounded-lg hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back</span>
            </div>
          </button>
        </div>
      </nav>



      {/* Enhanced Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className={`w-full mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-wider font-cyber leading-tight">
                BOOST<span className="text-primary animate-glow">LAB</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-6 rounded-full shadow-cyber"></div>
            </div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Robot Image */}
            <div className={`transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                <div className="bg-ui-medium/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={Robot} 
                      alt='BoostLab Robot' 
                      className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                    />
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyber-blue/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyber-blue/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* Enhanced Subtitle */}
              <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cyber">
                    Meet Your AI Assistant
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                    Our advanced AI companion is here to guide you through your photography journey, 
                    providing personalized insights and helping you master the art of visual storytelling.
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-cyber-blue rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200 font-medium">Personalized Learning Paths</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-neon-cyan rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200 font-medium">Real-time Feedback & Analysis</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-portal-orange rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-200 font-medium">Advanced Composition Guidance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Features Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 delay-1300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-ui-dark/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyber-blue rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
                  <p className="text-gray-300">AI-powered analysis of your photos with detailed feedback.</p>
                </div>

                <div className="bg-ui-dark/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-neon-cyan rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Learning Resources</h3>
                  <p className="text-gray-300">Comprehensive tutorials and learning materials.</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className={`transition-all duration-1000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/auth/signup')}
                    size="lg"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    }
                  >
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
   </div>
  )
}

export default Card;