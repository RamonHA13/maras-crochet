import { create } from 'zustand'
import { Category } from '../types/product'
import { config } from '../lib/config'

interface CategoriesStore {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  getCategoryById: (id: number) => Category
}

const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  getCategoryById: (id: number) => {
    const category = get().categories.find(x => x.id === id)
    return category!
  },
  setCategories: (categories: Category[]) => {
    const data = categories ?? categoriesPlaceholder
    set({
      categories: data.map(x => ({
        ...x,
        imgUrls: x.imgUrls.map(y => y.replace('localhost', config.ip))
      }))
    })
  }
}))

const categoriesPlaceholder = [
  {
    id: 1,
    name: 'Flores',
    imgUrl: 'https://via.placeholder.com/50?text=Flores'
  },
  {
    id: 2,
    name: 'Llavero',
    imgUrl: 'https://via.placeholder.com/50?text=Llavero'
  },
  {
    id: 3,
    name: 'Ramos',
    imgUrl: 'https://via.placeholder.com/50?text=Ramos'
  },
  {
    id: 4,
    name: 'Amigurumi',
    imgUrl: 'https://via.placeholder.com/50?text=Amigurumi'
  }
]

export default useCategoriesStore
