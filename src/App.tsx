
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { VerifyOtpPage } from './pages/VerifyOtp'
import HomePage from './pages/Home'
import ResetPasswordPage from './pages/ResetPassword'
import TakeTestPage from './pages/TakeTestPage'
import ResultsPage from './pages/ResultPage'
import Home2Page from './pages/Plans'
import SubscriptionPlans from './pages/Plans'


const App = () => {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

<Route path='plans' element={<SubscriptionPlans/>}/>
          <Route path='take-test' element={<TakeTestPage/>} />
          <Route path='results' element={<ResultsPage/>} />
        
        </Routes>
      </div>
    </Router>
  )
}

export default App
