import { z } from 'zod'

export const uuidValidator = z.string().uuid()
export const numberIdValidator = z.string().pipe(z.number().int().positive())
