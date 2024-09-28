import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  email: string
  id: string
  token: string
  setAuth: (email: string, id: string, token: string) => void
  signOut: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      id: '',
      token: '',
      setAuth: (email: string, id: string, token: string) => {
        if (!email || !id) throw new Error('No email or id supplied')
        set({ email, id, token })
      },
      signOut: () => {
        set({email: '', id: '', token: ''})
      }
    }),
    {
      name: 'auth'
    }
  )
)

export default useAuthStore
