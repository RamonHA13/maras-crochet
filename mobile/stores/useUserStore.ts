import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../types/user'

interface Auth {
  email: string
  token: string
}
interface AuthStore {
  user: {
    id?: string
    auth?: Auth
    data?: User
  }
  setAuth: (id: string, data?: Auth) => void
  setData: (key: string, data: any) => void
}

const useUserStore = create<AuthStore>()(
  persist(
    set => ({
      user: {
        id: undefined,
        auth: undefined,
        data: {}
      },
      setAuth: (id: string, data?: Auth) =>
        set(state => ({ user: { ...state.user, id, auth: data } })),

      setData: (key: string, data: any) => {
        if (key === 'email') {
          set(state => ({
            user: { ...state.user, auth: { ...state.user.auth!, email: data } }
          }))
          return
        }
        set(state => ({
          user: {
            ...state.user,
            data: {
              ...state.user.data,
              [key]: data
            }
          }
        }))
      }
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useUserStore
