import { PrismaClient } from '@prisma/client'
import AuthRepository from './repository'
import prismaClient from '../../../lib/prisma'
import { AuthData, LoginData } from '../model'

export default class AuthPrismaRepository
  implements AuthRepository<AuthData, LoginData>
{
  prisma: PrismaClient = prismaClient

  constructor() {}

  async get(email: string): Promise<LoginData | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        email: true,
        id: true,
        password: true,
        role: true
      }
    })
    return user
  }
  async create(email: string, password: string): Promise<AuthData> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password
      },
      select: { email: true, id: true }
    })
    return user
  }
}
