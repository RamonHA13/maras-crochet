import { uuid } from '../../../lib/types'

export default interface UserRepository<T> {
  getAll: () => Promise<T[]>
  get: (id: uuid) => Promise<T | null>
  create: (data: T) => Promise<T>
}
