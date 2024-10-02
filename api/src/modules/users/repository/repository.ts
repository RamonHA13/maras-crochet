import Roles from '../../../lib/enums/roles'
import { uuid } from '../../../lib/types'

export default interface UserRepository<T, U> {
  getAll: (roles?: Roles[]) => Promise<T[]>
  get: (id: uuid) => Promise<T | null>
  create: (data: U) => Promise<T>
}
