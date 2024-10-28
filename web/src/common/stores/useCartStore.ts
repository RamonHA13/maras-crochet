import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartProductPreview {
  id: string
  originalId: string
  price: number
  name: string
  imgUrl: string
}

interface CartStore {
  products: CartProductPreview[]
  addToCart: (product: CartProductPreview) => void
  deleteFromCart: (id: string) => void
}

const useCartStore = create<CartStore>()(
  persist(
    set => ({
      products: [],
      addToCart: (product: CartProductPreview) => {
        set(state => ({ products: [...state.products, product] }))
      },
      deleteFromCart: (id: string) => {
        set(state => ({ products: state.products.filter(x => x.id !== id) }))
      }
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCartStore
