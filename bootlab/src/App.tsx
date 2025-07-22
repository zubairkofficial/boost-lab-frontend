
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignInPage } from './pages/SignIn'
import { SignUpPage } from './pages/SignUp'
import { ForgotPasswordPage } from './pages/ForgotPassword'


const App = () => {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        
        
        </Routes>
      </div>
    </Router>
  )
}

export default App
