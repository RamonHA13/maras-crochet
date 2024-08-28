import { PrismaClient, User } from '@prisma/client'
import { uuid } from '../../../lib/types'
import UserRepository from './repository'
import prismaClient from '../../../lib/prisma'

export default class UserPrismaRepository implements UserRepository<User> {
  prisma: PrismaClient = prismaClient

  async get(id: uuid): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data
    })
    return user
  }
}
