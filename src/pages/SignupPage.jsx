import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function SignupPage() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // すでにログイン済みの場合は物件一覧画面へ
  if (user) {
    return <Navigate to="/properties" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setSubmitting(true)

    const { data, error: signUpError } = await signUp(email, password)

    setSubmitting(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // メール確認が必要な設定の場合はセッションが発行されないため案内を表示する
    if (!data.session) {
      setInfo('確認メールを送信しました。メール内のリンクから登録を完了してください。')
      return
    }

    navigate('/properties')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        {info && <p className="info-message">{info}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? '登録中...' : '会員登録'}
        </button>
        <p className="auth-switch">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
