import { create } from 'zustand'
import { CategoryResponseDto } from '../../services/category'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CategoryStore {
  categories: CategoryResponseDto[]
  setCategories: (categories: CategoryResponseDto[]) => void
  getCategoryById: (id: number) => CategoryResponseDto
}

const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (categories: CategoryResponseDto[]) => {
        set({ categories })
      },
      getCategoryById: (id: number) => {
        const category = get().categories.find(x => x.id === id)
        return category!
      }
    }),
    { name: 'categories', storage: createJSONStorage(() => localStorage) }
  )
)

export default useCategoryStore
