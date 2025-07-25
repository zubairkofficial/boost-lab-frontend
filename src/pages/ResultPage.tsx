import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuturisticButton from '../components/furastic-button'

export default function ResultsPage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('testAnswers')
    if (stored) {
      setAnswers(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>

      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div className="max-w-xl w-full bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber text-center mb-4">Your Test Results</h1>
          <div className="space-y-4">
            {answers.map((ans, idx) => (
              <div key={idx} className="p-3 bg-ui-dark/40 rounded-lg border border-primary/20 text-white">
                Question {idx + 1}: <span className="text-cyber-blue">{ans}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <FuturisticButton onClick={() => navigate('/')}>Back to Home</FuturisticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
