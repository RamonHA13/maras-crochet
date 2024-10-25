import { create } from 'zustand'
import { Product } from '../types/product'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface FavoritesStore {
  products: Product[]
  isFavoriteProduct: (id: string) => boolean
  setProduct: (product: Product) => void
  removeProduct: (id: string) => void
  clear: () => void
}

const useFavoriteStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      products: [],
      setProduct: (product: Product) => {
        set(state => ({ products: [...state.products, product] }))
      },
      removeProduct: (id: string) => {
        set(state => ({ products: state.products.filter(x => x.id !== id) }))
      },
      isFavoriteProduct: (id: string) => {
        const product = get().products.find(x => x.id === id)
        return Boolean(product)
      },
      clear: () => {
        set({ products: [] as Product[] })
      }
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useFavoriteStore
