import { z } from 'zod'

export interface CategoryResponseDto {
  id: number
  name: string
  imgUrls: string[]
}

export type CategoryRequestDto = Omit<CategoryResponseDto, 'id'>

export const createCategoryRequest = z.object({
  name: z.string(),
  imgUrls: z.array(z.string().url())
})

export const patchCategoryRequest = createCategoryRequest.partial()
