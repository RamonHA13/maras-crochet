// TODO: Separar los modelos por tipo (Table, DTO, etc)

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
}

export interface ProductDetailsDto extends Product {}
