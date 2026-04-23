import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import VerifyEmailSuccessPage from './pages/VerifyEmailSuccessPage'
import OpenAppPage from './pages/OpenAppPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"                     element={<Navigate to="/login" />} />
      <Route path="/login"                element={<LoginPage />} />
      <Route path="/register"             element={<RegisterPage />} />
      <Route path="/forgot-password"      element={<ForgotPasswordPage />} />
      <Route path="/reset-password"       element={<ResetPasswordPage />} />
      <Route path="/verify-email"         element={<VerifyEmailPage />} />
      <Route path="/verify-email/success" element={<VerifyEmailSuccessPage />} />
      <Route path="/open-app"             element={<OpenAppPage />} />
      <Route path="/dashboard"            element={<DashboardPage />} />
    </Routes>
  )
}