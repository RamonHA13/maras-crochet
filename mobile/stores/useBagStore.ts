import { create } from 'zustand'
import { BagProduct, Product } from '../types/product'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface BagStore {
  products: Product[]
  setBagProduct: (product: Product) => void
  removeBagProduct: (id: string) => void
}

const useBagStore = create<BagStore>()(
  persist(
    set => ({
      products: [],
      setBagProduct: (product: Product) => {
        set(state => ({
          products: [...state.products, product]
        }))
      },
      removeBagProduct: (id: string) => {
        set(state => ({
          products: state.products.filter(x => x.id !== id)
        }))
      }
    }),
    {
      name: 'bag',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useBagStore
