import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface User {
  name?: string
  contactNumber?: string
  createdAt?: string
  updatedAt?: string
  acceptTermsAndConditions?: boolean
  mailingAddress?: string
}

interface Auth {
  email: string
  token: string
}
interface UserStore {
  user: {
    id?: string
    auth?: Auth
    data?: User
  }
  setAuth: (id: string, data?: Auth) => void
  /*eslint-disable-next-line */
  setData: (key: string, data: any) => void
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: {
        id: undefined,
        auth: undefined,
        data: undefined
      },
      setAuth: (id: string, data?: Auth) =>
        set(state => ({ user: { ...state.user, id, auth: data } })),
      /*eslint-disable-next-line */
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
    { name: 'user', storage: createJSONStorage(() => localStorage) }
  )
)

export default useUserStore
