export interface Category {
  id: any
  name: string
  imgUrls: string[]
}

export interface Product {
  id: string
  name: string
  imgUrls: string[]
  description: string
  stars: number
  price: number
  createdAt: string
  inStock: boolean
  category_id: number
}

export interface BagProduct extends Product {
  amount: number
  size: string
  color: string
}
