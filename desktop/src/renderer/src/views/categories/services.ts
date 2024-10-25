import API from '@renderer/common/utils/API'
import { Category, CategoryRequestDto, CreateCategoryRequestDto } from './model'
import { ReturnTuple } from '@renderer/common/utils/types'

const END_POINT = '/category'

export async function getAllCategories(): Promise<ReturnTuple<CategoryRequestDto[]>> {
  return await API.get<CategoryRequestDto[]>(END_POINT)
}

export async function createCategory(
  data: CreateCategoryRequestDto,
  token: string
): Promise<ReturnTuple<Category>> {
  return await API.post<Category>(END_POINT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}
export async function deleteCategoryById(id: number, token: string) {
  return await API.delete<Category>(`${END_POINT}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
