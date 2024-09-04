import { uuid } from '../../../lib/types'
import prismaClient from '../../../lib/prisma'
import UserFavoriteRepository from './repository'

export default class UserFavoritePrismaRepository
  implements UserFavoriteRepository<string[]>
{
  prisma = prismaClient
  async get(userId: uuid): Promise<string[]> {
    const userFavoriteProducts =
      await this.prisma.userFavoriteProducts.findMany({
        where: {
          userId
        },
        select: {
          productId: true
        }
      })

    const productsIds = userFavoriteProducts.map(x => x.productId)
    return productsIds
  }

  async create(userId: uuid, productId: uuid): Promise<string[]> {
    const productCreated = await this.prisma.userFavoriteProducts.create({
      data: {
        userId,
        productId
      },
      select: {
        productId: true
      }
    })
    return [productCreated.productId]
  }

  async delete(userId: uuid, productId: uuid): Promise<string[]> {
    const favoriteProductDeleted =
      await this.prisma.userFavoriteProducts.delete({
        where: {
          productId_userId: {
            userId,
            productId
          }
        },
        select: {
          productId: true
        }
      })

    return [favoriteProductDeleted.productId]
  }
}
