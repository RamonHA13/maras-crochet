export interface Category {
  id: any
  name: string
  imgUrl: string
}

export interface Product {
  id: any
  name: string
  imgUrl: string
  description: string
  stars: number
  price: number
}

export interface BagProduct extends Product {
  amount: number
  size: string
  color: string
}
