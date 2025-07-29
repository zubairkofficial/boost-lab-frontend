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
import Success from "./pages/success";

// ✅ Components
// import ProtectedRoute from "./components/ProtectedRoute";
import LayoutWithSidebar from "./components/LayoutWithSidebar"; // ✅ Import layout
import Cancel from "./pages/cancel";

const App = () => {
  return (
    <Router>
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
                <Dashboard />
            }
          />
          <Route
            path="/plans"
            element={
                <SubscriptionPlans />
            }
          />
            <Route
            path="/success"
            element={
                <Success />
            }
          />
            <Route
            path="/cancel"
            element={
                <Cancel />
            }
          />
          <Route
            path="/take-test"
            element={
                <TakeTestPage />
            }
          />
          <Route
            path="/results"
            element={
                <ResultsPage />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
