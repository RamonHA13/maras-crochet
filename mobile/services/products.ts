import { ReturnTuple } from '../types/common'
import { Product } from '../types/product'
import API from '../lib/api'

export async function getAllProducts(): Promise<ReturnTuple<Product[]>> {
  try {
    const data = await API.get<Product[]>('/product')
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}
