import { User } from '@prisma/client'
import UserRepository from './repository/repository'
import { ReturnTuple, uuid } from '../../lib/types'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'
import CreatingUserError from './errors/CreatingUserError'

export interface IUserService {
  repository: UserRepository<User>
  getAllUsers: () => Promise<ReturnTuple<User[]>>
  getUserById: (id: uuid) => Promise<ReturnTuple<User>>
  createUser: (data: User) => Promise<ReturnTuple<User>>
}

export default class UserService implements IUserService {
  repository: UserRepository<User>

  constructor(repository: UserRepository<User>) {
    this.repository = repository
  }

  async getAllUsers(): Promise<ReturnTuple<User[]>> {
    try {
      const users = await this.repository.getAll()
      /**
       * TODO:
       * - Implementar logica para mostrar solo la informacion necesaria:
       * - No contraseñas
       */
      return [null, users]
    } catch (error) {
      return [error, null]
    }
  }

  async getUserById(id: uuid): Promise<ReturnTuple<User>> {
    try {
      const user = await this.repository.get(id)
      /**
       * TODO:
       * - Implementar logica para mostrar solo la informacion necesaria:
       * - No contraseñas
       */
      if (!user) return [new UserNotFoundError(), null]
      return [null, user]
    } catch (error) {
      return [error, null]
    }
  }

  async createUser(data: User): Promise<ReturnTuple<User>> {
    try {
      const user = await this.repository.create(data)
      /**
       * TODO:
       * - Hacer un userDto
       */
      if (!user) return [new CreatingUserError(), null]
      return [null, user]
    } catch (error) {
      return [error, null]
    }
  }
}
