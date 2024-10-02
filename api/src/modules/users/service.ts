import { UserRequestDto, UserResponseDto } from './model'
import UserRepository from './repository/repository'
import { ReturnTuple, uuid } from '../../lib/types'
import UserNotFoundError from '../../lib/errors/UserNotFoundError'
import CreatingUserError from './errors/CreatingUserError'
import { User } from '@prisma/client'
import Roles from '../../lib/enums/roles'

export interface IUserService {
  repository: UserRepository<User, UserRequestDto>
  getAllUsers: (roles?: Roles[]) => Promise<ReturnTuple<UserResponseDto[]>>
  getUserById: (id: uuid) => Promise<ReturnTuple<UserResponseDto>>
  createUser: (data: UserRequestDto) => Promise<ReturnTuple<UserResponseDto>>
}

export default class UserService implements IUserService {
  repository: UserRepository<User, UserRequestDto>

  constructor(repository: UserRepository<User, UserRequestDto>) {
    this.repository = repository
  }

  async getAllUsers(roles?: Roles[]): Promise<ReturnTuple<UserResponseDto[]>> {
    try {
      const users = await this.repository.getAll(roles)

      const usersParsed: UserResponseDto[] = users.map(x => {
        /* eslint-disable-next-line */
        const { password, ...rest } = x
        return rest
      })

      return [null, usersParsed]
    } catch (error) {
      return [error, null]
    }
  }

  async getUserById(id: uuid): Promise<ReturnTuple<UserResponseDto>> {
    try {
      const user = await this.repository.get(id)

      if (!user) return [new UserNotFoundError(), null]

      /* eslint-disable-next-line */
      const { password, ...rest } = user

      const userParsed: UserResponseDto = {
        ...rest
      }

      return [null, userParsed]
    } catch (error) {
      return [error, null]
    }
  }

  async createUser(
    data: UserRequestDto
  ): Promise<ReturnTuple<UserResponseDto>> {
    try {
      const user = await this.repository.create(data)
      if (!user) return [new CreatingUserError(), null]

      /* eslint-disable-next-line */
      const { password, ...rest } = user

      const userParsed: UserResponseDto = {
        ...rest
      }
      return [null, userParsed]
    } catch (error) {
      return [error, null]
    }
  }
}
