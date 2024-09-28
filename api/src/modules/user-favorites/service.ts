import { ReturnTuple, uuid } from '../../lib/types'
import UserFavoriteRepository from './repository/repository'

export interface IUserFavoriteServie {
  repository: UserFavoriteRepository<string[]>

  getAllUserFavorites: (userId: uuid) => Promise<ReturnTuple<string[]>>
  deleteUserFavoriteById: (
    userId: uuid,
    productId: uuid
  ) => Promise<ReturnTuple<string>>
  createUserFavoriteById: (
    userId: uuid,
    productId: uuid
  ) => Promise<ReturnTuple<string>>
}

export default class UserFavoriteService implements IUserFavoriteServie {
  repository: UserFavoriteRepository<string[]>
  constructor(repository: UserFavoriteRepository<string[]>) {
    this.repository = repository
  }

  async getAllUserFavorites(userId: uuid): Promise<ReturnTuple<string[]>> {
    try {
      const productsIds = await this.repository.get(userId)
      return [null, productsIds]
    } catch (error) {
      return [error, null]
    }
  }

  async createUserFavoriteById(
    userId: uuid,
    productId: uuid
  ): Promise<ReturnTuple<string>> {
    try {
      const productFavoriteCreatedId = await this.repository.create(
        userId,
        productId
      )
      return [null, productFavoriteCreatedId[0]]
    } catch (error) {
      return [error, null]
    }
  }

  async deleteUserFavoriteById(
    userId: uuid,
    productId: uuid
  ): Promise<ReturnTuple<string>> {
    try {
      const favoriteProducttDeletedId = await this.repository.delete(
        userId,
        productId
      )
      return [null, favoriteProducttDeletedId[0]]
    } catch (error) {
      return [error, null]
    }
  }
}
