export type ReturnTuple<T> = [unknown | Error | null, T | null]

declare module 'express-serve-static-core' {
  interface Request {
    session: {
      user?: {
        id: string
        role: string
      }
    }
  }
}
