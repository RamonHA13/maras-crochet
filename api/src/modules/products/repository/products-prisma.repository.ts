import { uuid } from '../../../lib/types'
import { ProductRequestDto, ProductResponseDto } from '../model'
import ProductRepository from './repository'
import prismaClient from '../../../lib/prisma'

export default class ProductPrismaRepository
  implements ProductRepository<ProductResponseDto, ProductRequestDto>
{
  prisma = prismaClient
  async getAll(): Promise<ProductResponseDto[]> {
    const products = (await this.prisma.product.findMany({
      include: { category: true }
    })) as ProductResponseDto[]

    return products
  }
  async get(id: uuid): Promise<ProductResponseDto> {
    const product = (await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: { category: true }
    })) as ProductResponseDto
    return product
  }
  async delete(id: uuid): Promise<ProductResponseDto> {
    const productDeleted = (await this.prisma.product.delete({
      where: { id },
      include: { category: true }
    })) as ProductResponseDto

    return productDeleted
  }

  async edit(
    id: uuid,
    data: Partial<ProductRequestDto>
  ): Promise<ProductResponseDto> {
    const productEdited = (await this.prisma.product.update({
      where: { id },
      data,
      include: { category: true }
    })) as ProductResponseDto
    return productEdited
  }

  async create(data: ProductRequestDto): Promise<ProductResponseDto> {
    /* eslint-disable-next-line */
    const { deletedImages, ...rest } = data //TODO: Cambiar tipos para evitar esto

    const productCreated = await this.prisma.product.create({
      data: rest,
      include: { category: true }
    })

    return productCreated as ProductResponseDto
  }
}
