import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { SignInPage } from "./pages/auth/SignIn";
import { SignUpPage } from "./pages/auth/SignUp";
import { ForgotPasswordPage } from "./pages/auth/ForgotPassword";
import ConfirmEmailPage from "./pages/auth/ConfirmEmail";

import ResetPasswordPage from "./pages/auth/ResetPassword";
import TakeTestPage from "./pages/TakeTestPage";
import ResultsPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";
import SubscriptionPlans from "./pages/Plans";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutWithSidebar from "./components/LayoutWithSidebar";
import AppInitializer from "./components/AppInitializer";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import NotFound from "./pages/NotFound";

const App = () => {
  const accessToken = localStorage.getItem("access_token");
  console.log("accessToken",accessToken)


  return (
    // <Provider store={store}>
      <AppInitializer>
        <Router>
          <ToastProvider>
            <AuthProvider>
              <div className="App">
                {/* Global Toaster */}
                <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
                <Routes>
                  {/* Public Routes */}
                  {/* <Route path="/test" element={<HomePage />} /> */}
                  <Route path="*" element={<NotFound />} />
                  <Route path="/auth/signup" element={<SignUpPage />} />
                  <Route path="/auth/login" element={<SignInPage />} />
                  <Route path="/auth/confirm-email" element={<ConfirmEmailPage />} />
                  <Route
                    path="/auth/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/auth/reset-password"
                    element={<ResetPasswordPage />}
                  />

                  {/* Protected Routes without Sidebar */}
                  <Route
                    path="/take-test"
                    element={
                      <ProtectedRoute>
                        <TakeTestPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Routes with Sidebar */}
                  <Route element={<LayoutWithSidebar />}>
                  <Route path="/" element={
                     <ProtectedRoute>
                    <Dashboard />
                    </ProtectedRoute>
                    } />

                    <Route
                      path="/dashboard"
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
                      path="/results"
                      element={
                        <ProtectedRoute>
                          <ResultsPage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Routes>
              </div>
            </AuthProvider>
          </ToastProvider>
        </Router>
      </AppInitializer>
    // </Provider>
  );
};

export default App;
