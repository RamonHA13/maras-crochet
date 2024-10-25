import { ReturnTuple } from '../../lib/types'
import { CategoryRequestDto, CategoryResponseDto } from './model'
import CategoryRepository from './repository/repository'

export interface ICategoryService {
  repository: CategoryRepository<CategoryResponseDto, CategoryRequestDto>

  getAll: () => Promise<ReturnTuple<CategoryResponseDto[]>>
  getById: (id: number) => Promise<ReturnTuple<CategoryResponseDto>>
  deleteById: (id: number) => Promise<ReturnTuple<CategoryResponseDto>>
  create: (
    data: CategoryRequestDto
  ) => Promise<ReturnTuple<CategoryResponseDto>>
  updateById: (
    id: number,
    data: Partial<CategoryRequestDto>
  ) => Promise<ReturnTuple<CategoryResponseDto>>
}

/**
 * TODO:
 * - Hacer validaciones de errores a retornar
 */
export default class CategoryService implements ICategoryService {
  repository: CategoryRepository<CategoryResponseDto, CategoryRequestDto>

  constructor(
    repository: CategoryRepository<CategoryResponseDto, CategoryRequestDto>
  ) {
    this.repository = repository
  }

  async getAll(): Promise<ReturnTuple<CategoryResponseDto[]>> {
    try {
      const categories = await this.repository.getAll()
      return [null, categories]
    } catch (error) {
      return [error, null]
    }
  }

  async getById(id: number): Promise<ReturnTuple<CategoryResponseDto>> {
    try {
      const category = await this.repository.get(id)
      if (!category) return [new Error('CategoryNotFound'), null]

      return [null, category]
    } catch (error) {
      return [error, null]
    }
  }
  async deleteById(id: number): Promise<ReturnTuple<CategoryResponseDto>> {
    try {
      const categoryDeleted = await this.repository.delete(id)
      return [null, categoryDeleted]
    } catch (error) {
      return [error, null]
    }
  }

  async create(
    data: CategoryRequestDto
  ): Promise<ReturnTuple<CategoryResponseDto>> {
    try {
      const categoryCreated = await this.repository.create(data)
      return [null, categoryCreated]
    } catch (error) {
      return [error, null]
    }
  }

  async updateById(
    id: number,
    data: Partial<CategoryRequestDto>
  ): Promise<ReturnTuple<CategoryResponseDto>> {
    try {
      const categoryUpdated = await this.repository.edit(id, data)
      return [null, categoryUpdated]
    } catch (error) {
      return [error, null]
    }
  }
}
