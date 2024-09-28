import { z } from 'zod'
import { uuid } from '../../lib/types'

export interface ProductResponseDto {
  id: uuid
  name: string
  price: number
  description: string
  imgUrls: string[]
  inStock: boolean
}

export type ProductRequestDto = Omit<ProductResponseDto, 'id'> & {
  deletedImages?: string[]
}

export const createProductRequest = z.object({
  name: z.string(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string(),
  imgUrls: z.array(z.string().url()),
  inStock: z.string().transform(val => val === 'true')
})

export const patchProductRequest = createProductRequest.partial().merge(
  z.object({
    deletedImages: z.array(z.string().url()).optional()
  })
)
