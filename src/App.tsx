import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
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

// ✅ Components
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutWithSidebar from "./components/LayoutWithSidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import store from "./store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <AuthProvider>
            <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/login" element={<SignInPage />} />
            <Route path="/auth/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

            {/* ✅ Protected Routes with Sidebar */}
            <Route element={<LayoutWithSidebar />}>
              <Route
                path="/auth/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plans"
                element={
                  <ProtectedRoute>
                    <SubscriptionPlans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/success"
                element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cancel"
                element={
                  <ProtectedRoute>
                    <Cancel />
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
            </Route>
          </Routes>
        </AuthProvider>
        </ToastProvider>
      </Router>
    </Provider>
  );
};

export default App;
