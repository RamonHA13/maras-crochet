import { z } from 'zod'

export interface CategoryResponseDto {
  id: number
  name: string
  imgUrl: string
}

export type CategoryRequestDto = Omit<CategoryResponseDto, 'id'>

export const createCategoryRequest = z.object({
  name: z.string(),
  imgUrl: z.string().url()
})

export const patchCategoryRequest = createCategoryRequest.partial()
