import Api from '../common/api'
import { ReturnTuple } from '../common/types'
import { CategoryResponseDto } from './category'

const END_POINT = '/product'

export interface ProductResponseDto {
  id: string
  name: string
  price: number
  description: string
  imgUrls: string[]
  inStock: boolean
  category_id: number
  createdAt: string
  updatedAt: string
  category: CategoryResponseDto
}

export async function getProducts(): Promise<
  ReturnTuple<ProductResponseDto[]>
> {
  return await Api.get<ProductResponseDto[]>(END_POINT)
}
