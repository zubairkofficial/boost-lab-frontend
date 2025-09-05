import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SignInPage } from "./pages/auth/SignIn";
import { ForgotPasswordPage } from "./pages/auth/ForgotPassword";
import ConfirmEmailPage from "./pages/auth/ConfirmEmail";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import TakeTestPage from "./pages/TakeTestPage";
import ResultsPage from "./pages/ResultPage";
import BeforeSubsciption from "./pages/personalAccount/BeforeSubsciption";
import AfterSubsciption from "./pages/personalAccount/AfterSubsciption";
import ProtectedRoute from "./components/ProtectedRoute";
import AppInitializer from "./components/AppInitializer";
import Success from "./pages/plans/Success";
import Cancel from "./pages/plans/Cancel";
import NotFound from "./generic-components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import PhotoIdentity from "./pages/quizPages/Start";
import QuizWizard from "./pages/quizPages/QuizMain";
import Stage2_ChatBotPage from "./pages/agents/Stage2_Chatbot";
import AuthCallback from "./pages/AuthCallback";

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
                <Route path="/" element={<PhotoIdentity />} />
                <Route path="/test" element={<QuizWizard />} />
                <Route path="/auth/login" element={<SignInPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

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

                {/* Free page: block if already subscribed */}
                <Route
                  path="/personal-account-free"
                  element={
                    <ProtectedRoute blockIfSubscribed={true}>
                      <BeforeSubsciption />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/personal-account"
                  element={
                    <ProtectedRoute requireSubscription={true}>
                      <AfterSubsciption />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/strategy-generation"
                  element={
                    <ProtectedRoute requireSubscription={true}>
                      <Stage2_ChatBotPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/take-test"
                  element={
                    <ProtectedRoute requireSubscription={true}>
                      <TakeTestPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <ProtectedRoute requireSubscription={true}>
                      <Success />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cancel"
                  element={
                    <ProtectedRoute requireSubscription={true}>
                      <Cancel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/results"
                  element={
                    <ProtectedRoute requireSubscription={true}>
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
