import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FuturisticButton from '../components/furastic-button'

interface Question {
  id: number
  text: string
  options: string[]
}

export default function TakeTestPage() {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>([])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const questions: Question[] = [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['Paris', 'Rome', 'Madrid', 'Berlin'],
    },
    {
      id: 2,
      text: 'Which language is used for web apps?',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
    },
    {
      id: 3,
      text: 'What does CSS stand for?',
      options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
    },
    {
      id: 4,
      text: 'Which HTML tag is used to define a hyperlink?',
      options: ['<link>', '<a>', '<href>', '<hyperlink>'],
    },
    {
      id: 5,
      text: 'Which company developed React?',
      options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
    },
  ]

  const currentQuestion = questions[currentIndex]

  const handleNext = () => {
    if (!selectedOption) return

    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentIndex] = selectedOption
      return newAnswers
    })

    setSelectedOption(null)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Test finished → mark as taken, save answers, and navigate to home
      localStorage.setItem('testTaken', 'true');
      // Save answers to localStorage for results page
      const finalAnswers = [...answers];
      finalAnswers[currentIndex] = selectedOption;
      localStorage.setItem('testAnswers', JSON.stringify(finalAnswers));
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)',
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>

      {/* Animated glowing circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div className={`w-full max-w-xl mx-auto bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-2">
              AI Test
            </h1>
            <p className="text-gray-300 text-sm">Question {currentIndex + 1} of {questions.length}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-2 rounded-full shadow-cyber"></div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium text-white mb-4">{currentQuestion.text}</p>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full px-4 py-3 rounded-lg text-white text-left border transition-all duration-300 ${
                      selectedOption === option
                        ? 'border-cyber-blue bg-cyber-blue/20'
                        : 'border-primary/20 bg-ui-dark/40 hover:bg-ui-dark/60'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <FuturisticButton onClick={handleNext}>
              {currentIndex === questions.length - 1 ? 'Finish Test' : 'Next'}
            </FuturisticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
