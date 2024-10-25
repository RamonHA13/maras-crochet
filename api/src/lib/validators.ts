import { z } from 'zod'

export const uuidValidator = z.string().uuid()
export const numberIdValidator = z
  .string()
  .transform(val => {
    const num = Number(val) // Convierte el string a un número
    if (isNaN(num)) {
      throw new Error('El valor debe ser un número') // Lanza un error si no es un número
    }
    return num // Devuelve el número
  })
  .refine(num => num > 0)
