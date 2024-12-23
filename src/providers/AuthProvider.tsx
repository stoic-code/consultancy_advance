'use client'
import { TAuthContext, User } from '@/types/auth.types'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'

import { getSession, setSession } from '@/helpers/auth.helper'
import toast from 'react-hot-toast'

const AuthContext = createContext<TAuthContext | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const encryptedSession = Cookies.get('session')
  const session = getSession(encryptedSession!)

  const [user, setUser] = useState<User | undefined>(session?.user)
  const [token, setToken] = useState<string | undefined>(session?.token)
  const [refreshToken, setRefreshToken] = useState(session?.refreshToken)

  const login = ({
    user,
    accessToken,
    refreshToken,
  }: {
    user: User
    accessToken: string
    refreshToken: string
  }) => {
    setUser(user)
    setToken(accessToken)
    setRefreshToken(refreshToken)
    setSession({ user, token: accessToken, refreshToken })
  }

  const logout = () => {
    setUser(undefined)
    setToken(undefined)
    setRefreshToken(undefined)
    Cookies.remove('session')
    toast.success('Logged out successfully !!')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use authentication context
export const useAuth = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return authContext
}

export { AuthContext, AuthProvider }
