import { PrismaClient } from '@prisma/client'
import { CategoryRequestDto, CategoryResponseDto } from '../model'
import CategoryRepository from './repository'
import prismaClient from '../../../lib/prisma'

export default class CategoriesPrismaRepository
  implements CategoryRepository<CategoryResponseDto, CategoryRequestDto>
{
  prisma: PrismaClient = prismaClient
  async get(id: number): Promise<CategoryResponseDto | null> {
    const category = (await this.prisma.category.findUnique({
      where: { id }
    })) as CategoryResponseDto | null

    return category
  }

  async getAll(): Promise<CategoryResponseDto[]> {
    const categories =
      (await this.prisma.category.findMany()) as CategoryResponseDto[]

    return categories
  }

  async edit(
    id: number,
    data: Partial<CategoryRequestDto>
  ): Promise<CategoryResponseDto> {
    const productEdited = (await this.prisma.category.update({
      where: { id },
      data
    })) as CategoryResponseDto

    return productEdited
  }

  async delete(id: number): Promise<CategoryResponseDto> {
    const productDeleted = (await this.prisma.category.delete({
      where: { id }
    })) as CategoryResponseDto
    return productDeleted
  }

  async create(data: CategoryRequestDto): Promise<CategoryResponseDto> {
    const productCreated = (await this.prisma.category.create({
      data
    })) as CategoryResponseDto
    return productCreated
  }
}
