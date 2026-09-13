import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログインの場合はログイン画面へリダイレクトする
function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="status-message">読み込み中...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
