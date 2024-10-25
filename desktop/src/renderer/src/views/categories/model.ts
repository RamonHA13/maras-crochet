import { Product } from '../products/model'

export interface CategoryTable {
  id: number
  name: string
}

export interface CreateCategoryRequestDto {
  name: string
  image: File
}

export interface CategoryRequestDto extends CategoryTable {
  imgUrls: string[]
  products: Product[]
}

export type Category = Omit<CategoryRequestDto, 'products'>
