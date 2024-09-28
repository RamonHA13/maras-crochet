export default interface AuthRepository<T, U> {
  get: (email: string) => Promise<U | null>
  create: (email: string, password: string) => Promise<T>
}
