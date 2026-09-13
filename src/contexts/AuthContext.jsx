import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

// アプリ全体でログイン状態（ユーザー情報）を共有するためのProvider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // 初回のセッション確認が終わるまではtrue（この間はリダイレクト判定をしない）
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ページ読み込み時に既存のセッションがあるか確認する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // ログイン・ログアウトなど認証状態の変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      },
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password })

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
