import { User } from '@prisma/client'
import { string, z } from 'zod'
import Roles from '../../lib/enums/roles'

const rolesValues = Object.values(Roles) as [string, ...string[]]

export const createUserRequest = z.object({
  email: z.string().email(),
  password: string().min(8, 'Password must be at leat 8 character long'),
  role: z.array(z.enum(rolesValues, { message: 'Invalid role' }))
})

export interface UserRequestDto {
  email: string
  password: string
  role: Roles[]
}
export type UserResponseDto = Omit<User, 'password'>
