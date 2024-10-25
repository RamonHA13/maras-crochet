// TODO: Separar los modelos por tipo (Table, DTO, etc)

import { Category } from '../categories/model'

export interface ProductTable {
  id: string
  name: string
  stock: boolean
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
  imgUrls: string[]
  inStock: boolean
  category: Category
}

export interface ProductDetailsDto extends Product {}
