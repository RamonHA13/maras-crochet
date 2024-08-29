import { z } from 'zod'
import Roles from '../../lib/enums/roles'

export interface AuthData {
  email: string
  id: string
}

export interface LoginData extends AuthData {
  password: string
  role: Roles[]
}

export interface AuthResponseDto extends AuthData {
  token: string
}

export const authSignupRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at leat 8 character long')
})
