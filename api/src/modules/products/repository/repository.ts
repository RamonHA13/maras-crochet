import { uuid } from '../../../lib/types'

export default interface ProductRepository<T, U> {
  get: (id: uuid) => Promise<T | null>
  getAll: () => Promise<T[]>
  delete: (id: uuid) => Promise<T>
  edit: (id: uuid, data: Partial<U>) => Promise<T>
  create: (data: U) => Promise<T>
}
