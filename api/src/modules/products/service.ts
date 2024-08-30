import { ReturnTuple, uuid } from '../../lib/types'
import { ProductRequestDto, ProductResponseDto } from './model'
import ProductRepository from './repository/repository'

/**
 * TODO:
 * - Hacer validaciones de errores a retornar
 */
export interface IProductService {
  repository: ProductRepository<ProductResponseDto, ProductRequestDto>

  getAllProducts: () => Promise<ReturnTuple<ProductResponseDto[]>>
  getById: (id: uuid) => Promise<ReturnTuple<ProductResponseDto>>
  deleteById: (id: uuid) => Promise<ReturnTuple<ProductResponseDto>>
  updateById: (
    id: uuid,
    data: Partial<ProductRequestDto>
  ) => Promise<ReturnTuple<ProductResponseDto>>
  createProduct: (
    data: ProductRequestDto
  ) => Promise<ReturnTuple<ProductResponseDto>>
}

export default class Productservice implements IProductService {
  repository: ProductRepository<ProductResponseDto, ProductRequestDto>
  constructor(
    repository: ProductRepository<ProductResponseDto, ProductRequestDto>
  ) {
    this.repository = repository
  }

  async getAllProducts(): Promise<ReturnTuple<ProductResponseDto[]>> {
    try {
      const products = await this.repository.getAll()

      return [null, products]
    } catch (error) {
      return [error, null]
    }
  }

  async getById(id: uuid): Promise<ReturnTuple<ProductResponseDto>> {
    try {
      const product = await this.repository.get(id)
      if (!product) return [new Error('No product found e.e'), null]

      return [null, product]
    } catch (error) {
      return [error, null]
    }
  }

  async deleteById(id: uuid): Promise<ReturnTuple<ProductResponseDto>> {
    try {
      const productDeleted = await this.repository.delete(id)
      return [null, productDeleted]
    } catch (error) {
      return [error, null]
    }
  }

  async updateById(
    id: uuid,
    data: Partial<ProductRequestDto>
  ): Promise<ReturnTuple<ProductResponseDto>> {
    try {
      const productUpdated = await this.repository.edit(id, data)
      return [null, productUpdated]
    } catch (error) {
      return [error, null]
    }
  }

  async createProduct(
    data: ProductRequestDto
  ): Promise<ReturnTuple<ProductResponseDto>> {
    try {
      const productCreated = await this.repository.create(data)
      return [null, productCreated]
    } catch (error) {
      return [error, null]
    }
  }
}
