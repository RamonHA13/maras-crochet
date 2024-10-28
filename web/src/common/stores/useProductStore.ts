import { create } from 'zustand'
import { ProductResponseDto } from '../../services/product'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ProductStore {
  products: ProductResponseDto[]
  setProducts: (products: ProductResponseDto[]) => void
  getByCategoryId: (id: number) => ProductResponseDto[]
  getById: (id: string) => ProductResponseDto
}

const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      setProducts: (products: ProductResponseDto[]) => {
        set({ products })
      },
      getByCategoryId: (id: number) => {
        const product = get().products.filter(x => x.category_id === id)
        return product
      },
      getById: (id: string) => {
        const product = get().products.find(x => x.id === id)
        return product!
      }
    }),
    { name: 'products', storage: createJSONStorage(() => localStorage) }
  )
)

export default useProductStore
