import { compare, genSalt, hash } from 'bcrypt'
import { ReturnTuple } from './types'

export async function hashPassword(
  password: string,
  saltRounds: number = 10
): Promise<ReturnTuple<string>> {
  try {
    const salt = await genSalt(saltRounds)
    const passwordHashed = await hash(password, salt)

    return [null, passwordHashed]
  } catch (error) {
    return [error, null]
  }
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<ReturnTuple<boolean>> {
  try {
    const isSamePassword = await compare(plainPassword, hashedPassword)
    return [null, isSamePassword]
  } catch (error) {
    return [error, null]
  }
}
