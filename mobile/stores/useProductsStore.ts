import { create } from 'zustand'
import { Product } from '../types/product'
import { config } from '../lib/config'

//TODO: Add get productByCategory
interface ProductsStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  getProductById: (id: string) => Product
  getRecentlyAdded: () => Product[]
  getProductByCategory: (category: number) => Product[]
}

const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  setProducts: (products: Product[]) => {
    const data = products || productsPlaceholder
    set({
      products: data.map(x => ({
        ...x,
        imgUrls: x.imgUrls.map(y => y.replace('localhost', config.ip))
      }))
    })
  },
  getProductById: (id: string) => {
    console.log(id)
    const product = get().products.find(x => x.id === id)
    return product!
  },
  getRecentlyAdded: () => {
    const days = 7
    const now = new Date()
    const cutoffDate = new Date(now.setDate(now.getDate() - days))
    return get()
      .products.map(x => ({ ...x, createdAt: new Date(x.createdAt) }))
      .filter(product => product.createdAt > cutoffDate)
      .map(x => ({ ...x, createdAt: x.createdAt.toISOString() }))
  },
  getProductByCategory: (category: number) => {
    const products = get().products.filter(x => x.category_id === category)
    return products
  }
}))

const productsPlaceholder: Product[] = []
//   {
//     id: 1,
//     name: 'Producto 1',
//     imgUrl: ['https://via.placeholder.com/150'],
//     description: 'Descripción del producto 1',
//     stars: 4.5,
//     price: 19.99,
//     createdAt: new Date().toISOString() // Asigna una fecha válida
//   },
//   {
//     id: 2,
//     name: 'Producto 2',
//     imgUrl: ['https://via.placeholder.com/150'],
//     description: 'Descripción del producto 2',
//     stars: 3.8,
//     price: 29.99,
//     createdAt: new Date().toISOString() // O una fecha específica como: new Date('2023-01-01')
//   },
//   {
//     id: 3,
//     name: 'Producto 3',
//     imgUrl: ['https://via.placeholder.com/150'],
//     description: 'Descripción del producto 3',
//     stars: 4.0,
//     price: 24.99,
//     createdAt: new Date().toISOString()
//   },
//   {
//     id: 4,
//     name: 'Producto 4',
//     imgUrl: ['https://via.placeholder.com/150'],
//     description: 'Descripción del producto 4',
//     stars: 5.0,
//     price: 39.99,
//     createdAt: new Date().toISOString()
//   }
// ]

export default useProductsStore
