import { Jwt, JwtPayload, sign, verify } from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { ReturnTuple } from './types'

export function signJWT(
  userId: string,
  userEmail: string,
  role: string,
  expireTime: string | number = '1h'
): string {
  const payload = {
    sub: 'authpayload',
    aud: ['web', 'mobile'],
    context: {
      user: {
        id: userId,
        email: userEmail,
        role
      }
    }
  }

  const options = {
    expiresIn: expireTime
  }

  const token = sign(payload, JWT_SECRET!, options)
  return token
}

export async function verifyJWT(
  token: string
): Promise<ReturnTuple<Jwt | JwtPayload | string>> {
  try {
    const decoded = await new Promise<Jwt | JwtPayload | string>(
      (resolve, reject) => {
        verify(token, JWT_SECRET!, (err, decoded) => {
          if (err) {
            return reject(err)
          }

          resolve(decoded!)
        })
      }
    )
    return [null, decoded]
  } catch (error) {
    return [error, null]
  }
}
