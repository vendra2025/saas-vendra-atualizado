'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'TENANT_OWNER' | 'TENANT_USER'
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  document?: string
  company?: string
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful login
          const mockUser: User = {
            id: '1',
            name: 'Usuário Demo',
            email,
            role: 'TENANT_OWNER',
          }
          const mockToken = 'mock-jwt-token-' + Date.now()

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw new Error('Credenciais inválidas')
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful registration
          const mockUser: User = {
            id: '1',
            name: data.name,
            email: data.email,
            role: 'TENANT_OWNER',
          }
          const mockToken = 'mock-jwt-token-' + Date.now()

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw new Error('Erro ao criar conta')
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error('Erro ao enviar email de recuperação')
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true })
        try {
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error('Erro ao redefinir senha')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
