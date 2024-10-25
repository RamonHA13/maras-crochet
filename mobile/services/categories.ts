import { ReturnTuple } from '../types/common'
import { Category } from '../types/product'
import API from '../lib/api'

export async function getAllCategories(): Promise<ReturnTuple<Category[]>> {
  try {
    const data = await API.get<Category[]>('/category')
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}
