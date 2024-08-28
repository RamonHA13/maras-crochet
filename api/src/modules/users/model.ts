import { string, z } from 'zod'

export const createUserRequest = z.object({
  email: z.string().email(),
  password: string().min(8, 'Password must be at leat 8 character long'),
  role: z.array(
    z.enum(['CLIENT', 'ADMIN', 'SUDO'], { message: 'Invalid role' })
  )
})
