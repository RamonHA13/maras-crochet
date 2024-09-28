import { create } from 'zustand'
import { Product } from './model'
import API from '@renderer/common/utils/API'

//TODO: Agregar estadoss de carga.
interface ProductState {
  // loading: boolean
  // success: boolean
  // error: boolean
  // errorData: any
  products: Product[]
  fetchProducts: () => Promise<void>
  addProduct: (product: FormData, token: string) => Promise<void>
  updateProduct: (id: string, dataToUpdate: FormData, token: string) => Promise<void>
  deleteProduct: (id: string, token: string) => Promise<void>
  getProductById: (id: string) => Product
}

const END_POINT = '/product'
const useProductStore = create<ProductState>((set, get) => ({
  // loading: false,
  // success: false,
  // error: false,
  // errorData: '',
  products: [],

  fetchProducts: async () => {
    const [err, data] = await API.get<Product[]>(END_POINT)
    if (!err) {
      set({ products: data })
      return
    }
    throw err
  },
  addProduct: async (product: FormData, token: string) => {
    const [err, data] = await API.post<Product>(END_POINT, product, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    if (!err) {
      set((state) => ({
        products: [...state.products, data]
      }))
      return
    }

    console.error(err)
    throw err
  },
  updateProduct: async (id: string, dataToUpdate: FormData, token: string) => {
    console.log(dataToUpdate)
    const [err, product] = await API.patch<Partial<Product>>(`${END_POINT}/${id}`, dataToUpdate, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    console.log(product)
    if (!err) {
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p))
      }))
      return
    }

    console.error(err)
    throw err
  },
  deleteProduct: async (id: string, token: string) => {
    const [err] = await API.delete<Partial<Product>>(`${END_POINT}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!err) {
      set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      }))
      return
    }

    console.error(err)
    throw err
  },
  getProductById: (id: string) => {
    const existingProduct = get().products.find((x) => x.id === id)
    return existingProduct!
  }
}))

export default useProductStore
