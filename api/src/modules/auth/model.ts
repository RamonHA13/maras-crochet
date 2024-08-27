import { z } from 'zod'
import { Role } from '@prisma/client'

export interface AuthData {
  email: string
  id: string
}

export interface LoginData extends AuthData {
  password: string
  role: Role[]
}

export interface AuthResponseDto extends AuthData {
  token: string
}

export const authSignupRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at leat 8 character long')
})
