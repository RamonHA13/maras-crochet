import { uuid } from '../../../lib/types'

export default interface UserFavoriteRepository<T> {
  get: (userId: uuid) => Promise<T>
  delete: (userId: uuid, productId: uuid) => Promise<T>
  create: (userId: uuid, productId: uuid) => Promise<T>
}
