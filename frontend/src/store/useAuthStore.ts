import { create } from 'zustand'
import api from '../utils/api'

type User = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  fetchUser: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    set({ token, user })

    const userRes = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    set({ user: userRes.data })
  },

  signup: async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    set({ token, user })

    const userRes = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    set({ user: userRes.data })
  },

  fetchUser: async () => {
    const token = localStorage.getItem('token')
    if (!token || token === 'undefined') return
    try {
      const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
      })
      set({ user: res.data })
    } catch (err) {
      console.error('Fetch user failed: ', err)
      localStorage.removeItem(token)
      set({ user: null, token: null })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))