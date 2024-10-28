import Api from '../common/api'
import { ReturnTuple } from '../common/types'

const END_POINT = '/category'

export interface CategoryResponseDto {
  id: number
  name: string
  imgUrls: string[]
  createdAt: string
  updatedAt: string
}
export async function getCategories(): Promise<
  ReturnTuple<CategoryResponseDto[]>
> {
  return await Api.get<CategoryResponseDto[]>(END_POINT)
}
