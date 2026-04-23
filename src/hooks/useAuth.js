import { useState, useEffect, useCallback } from 'react'
import { authApi } from '../lib/api'

const getStoredToken = () => localStorage.getItem('token')

export const useAuth = () => {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(getStoredToken)
  // loading = true seulement si on a un token à vérifier
  const [loading, setLoading] = useState(() => !!getStoredToken())

  const fetchUser = useCallback((currentToken) => {
    authApi.me(currentToken)
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (token) {
      fetchUser(token)
    }
  }, [token, fetchUser])

  const login = async (email, password) => {
    const data = await authApi.login({ email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const register = async (name, email, password, password_confirmation) => {
    const data = await authApi.register({ name, email, password, password_confirmation })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    try {
      await authApi.logout(token)
    } finally {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
    }
  }

  return { user, token, loading, login, register, logout }
}