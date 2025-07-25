import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { ForgotPasswordPage } from "./pages/ForgotPassword";
import { VerifyOtpPage } from "./pages/VerifyOtp";
import HomePage from "./pages/Home";
import ResetPasswordPage from "./pages/ResetPassword";
import TakeTestPage from "./pages/TakeTestPage";
import ResultsPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";
import SubscriptionPlans from "./pages/Plans";

// ✅ Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login" element={<SignInPage />} />
        <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* ✅ Protected Routes */}
        <Route path="/plans" element={
          <ProtectedRoute>
            <SubscriptionPlans />
          </ProtectedRoute>
          } />
        <Route
          path="/auth/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/take-test"
          element={
            <ProtectedRoute>
              <TakeTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
