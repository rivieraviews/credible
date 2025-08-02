import { create } from 'zustand'
import axios from 'axios'

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
    const res = await axios.post('/auth/login', { email, password })
    const token = res.data.token
    localStorage.setItem('token', token)
    set({ token })

    const userRes = await axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    set({ user: userRes.data })
  },

  signup: async (name, email, password) => {
    const res = await axios.post('/auth/signup', { name, email, password })
    const token = res.data.token
    localStorage.setItem('token', token)
    set({ token })

    const userRes = await axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    set({ user: userRes.data })
  },

  fetchUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    set({ user: res.data })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },
}))