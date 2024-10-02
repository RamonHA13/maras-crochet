import { PrismaClient, Role, User } from '@prisma/client'
import { uuid } from '../../../lib/types'
import UserRepository from './repository'
import prismaClient from '../../../lib/prisma'
import { UserRequestDto } from '../model'
import Roles from '../../../lib/enums/roles'

export default class UserPrismaRepository
  implements UserRepository<User, UserRequestDto>
{
  prisma: PrismaClient = prismaClient

  async get(id: uuid): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
  async getAll(roles?: Roles[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: roles
        ? {
            role: {
              hasSome: roles as Role[]
            }
          }
        : {}
    })

    return users
  }

  async create(data: UserRequestDto): Promise<User> {
    const user = await this.prisma.user.create({
      data
    })

    return user
  }
}
