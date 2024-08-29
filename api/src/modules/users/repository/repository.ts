import { uuid } from '../../../lib/types'

export default interface UserRepository<T, U> {
  getAll: () => Promise<T[]>
  get: (id: uuid) => Promise<T | null>
  create: (data: U) => Promise<T>
}
