import { z } from 'zod'
import { uuid } from '../../lib/types'
import { Category } from '@prisma/client'

export interface ProductResponseDto {
  id: uuid
  name: string
  price: number
  description: string
  imgUrls: string[]
  inStock: boolean
  category: Category
}

export type ProductRequestDto = Omit<ProductResponseDto, 'id' | 'category'> & {
  deletedImages?: string[]
  category_id: number
}

export const createProductRequest = z.object({
  name: z.string(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string(),
  imgUrls: z.array(z.string()),
  inStock: z.string().transform(val => val === 'true'),
  category_id: z.string().transform(val => Number(val))
})

export const patchProductRequest = createProductRequest.partial().merge(
  z.object({
    deletedImages: z.array(z.string().url()).optional()
  })
)
