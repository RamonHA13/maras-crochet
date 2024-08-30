import { z } from 'zod'
import { uuid } from '../../lib/types'

export interface ProductResponseDto {
  id: uuid
  name: string
  price: number
  description: string
  imgUrl: string
  inStock: boolean
}

export type ProductRequestDto = Omit<ProductResponseDto, 'id'>

export const createProductRequest = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imgUrl: z.string().url(),
  inStock: z.boolean()
})

export const patchProductRequest = createProductRequest.partial()
