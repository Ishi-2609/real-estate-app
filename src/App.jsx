import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import PropertiesPage from './pages/PropertiesPage'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 未ログインの場合はProtectedRoute内でログイン画面へリダイレクトされる */}
      <Route element={<ProtectedRoute />}>
        <Route path="/properties" element={<PropertiesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
