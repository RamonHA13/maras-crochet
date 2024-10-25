import { create } from 'zustand'
import { Category } from './model'

interface CategoryStore {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  deleteCategory: (id: number) => void
  editCategory: (id: number, data: Partial<Category>) => void
  getCategoryById: (id: number) => Category
}

//TODO: Persistir esto
const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  setCategories: (categories: Category[]) => {
    set({ categories })
  },
  addCategory: (category: Category) => {
    set((state) => ({ categories: [...state.categories, category] }))
  },
  deleteCategory: (id: number) => {
    set((state) => ({ categories: state.categories.filter((x) => x.id !== id) }))
  },
  editCategory: (id: number, data: Partial<Category>) => {
    set((state) => ({
      categories: state.categories.map((x) => (x.id === id ? { ...x, ...data } : x))
    }))
  },
  getCategoryById: (id: number) => {
    const category = get().categories.find((x) => x.id === id)

    return category!
  }
}))

export default useCategoryStore
