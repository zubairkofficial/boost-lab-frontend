import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SignInPage } from "./pages/auth/SignIn";
import { SignUpPage } from "./pages/auth/SignUp";
import { ForgotPasswordPage } from "./pages/auth/ForgotPassword";
import ConfirmEmailPage from "./pages/auth/ConfirmEmail";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import TakeTestPage from "./pages/TakeTestPage";
import ResultsPage from "./pages/ResultPage";
import BeforeSubsciption from "./pages/personalAccount/BeforeSubsciption";
import AfterSubsciption from "./pages/personalAccount/AfterSubsciption";
import SubscriptionPlans from "./pages/plans/PlansContent";
import ProtectedRoute from "./components/ProtectedRoute";
import AppInitializer from "./components/AppInitializer";
import Success from "./pages/plans/Success";
import Cancel from "./pages/plans/Cancel";
import NotFound from "./generic-components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <AppInitializer>
      <Router>
        <ScrollToTop />
        <ToastProvider>
          <AuthProvider>
            <div className="App">
              <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
              <Routes>
                <Route path="/auth/signup" element={<SignUpPage />} />
                <Route path="/auth/login" element={<SignInPage />} />
                <Route
                  path="/auth/confirm-email"
                  element={<ConfirmEmailPage />}
                />
                <Route
                  path="/auth/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/auth/reset-password"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/personal-account-free"
                  element={
                    // <ProtectedRoute>
                    <BeforeSubsciption />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/after-subscription"
                  element={
                    <ProtectedRoute>
                      <AfterSubsciption />
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
                  path="/take-test"
                  element={
                    <ProtectedRoute>
                      <TakeTestPage />
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
                  path="/results"
                  element={
                    <ProtectedRoute>
                      <ResultsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </AppInitializer>
  );
};

export default App;
