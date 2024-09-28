export type ReturnTuple<T> = [unknown | Error | null, T | null]
export type uuid = ReturnType<typeof crypto.randomUUID>

declare module 'express-serve-static-core' {
  interface Request {
    session: {
      user?: {
        id: string
        role: string[]
      }
    }
  }
}
