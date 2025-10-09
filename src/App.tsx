import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppInitializer from "./components/AppInitializer";
import ScrollToTop from "./components/ScrollToTop";
const SignInPage = lazy(() => import("./pages/auth/SignIn"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));
const ConfirmEmailPage = lazy(() => import("./pages/auth/ConfirmEmail"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));
const TakeTestPage = lazy(() => import("./pages/TakeTestPage"));
const ResultsPage = lazy(() => import("./pages/ResultPage"));
const BeforeSubsciption = lazy(
  () => import("./pages/personalAccount/BeforeSubsciption")
);
const AfterSubsciption = lazy(
  () => import("./pages/personalAccount/AfterSubsciption")
);
const Success = lazy(() => import("./pages/plans/Success"));
const Cancel = lazy(() => import("./pages/plans/Cancel"));
const NotFound = lazy(() => import("./generic-components/PageNotFound"));
const PhotoIdentity = lazy(() => import("./pages/quizPages/Start"));
const QuizWizard = lazy(() => import("./pages/quizPages/QuizMain"));
const Stage2_ChatBotPage = lazy(() => import("./pages/agents/Stage2_Chatbot"));
const Stage3_ChatBotPage = lazy(() => import("./pages/agents/Stage3_Chatbot"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Stage4_Chatbot = lazy(() => import("./pages/agents/Stage4_Chatbot"));
const Loginscreen = lazy(() => import("./pages/quizPages/loginScreens"));

const App = () => {
  return (
    <AppInitializer>
      <Router>
        <ScrollToTop />
        <ToastProvider>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <div className="App">
                <Toaster
                  position="top-right"
                  toastOptions={{ duration: 3000 }}
                />
                <Routes>
                  <Route path="/" element={<PhotoIdentity />} />
                  <Route path="/loginscreen" element={<Loginscreen />} />
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
                    path="/content"
                    element={
                      <ProtectedRoute requireSubscription={true}>
                        <Stage3_ChatBotPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/automation"
                    element={
                      <ProtectedRoute requireSubscription={true}>
                        <Stage4_Chatbot />
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
{/* testing collab */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Suspense>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </AppInitializer>
  );
};

export default App;
