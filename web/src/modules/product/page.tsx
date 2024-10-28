import { ChangeEvent, useState } from 'react'
import AppLayout from '../../common/components/AppLayout'
import useProductStore from '../../common/stores/useProductStore'
import ProductCard from './components/ProductCard'
import useCategoryStore from '../../common/stores/useCategoryStore'
import ProductsNotFound from './components/ProductsNotFound'

export default function ProductsPage() {
  const products = useProductStore(state => state.products)
  const categories = useCategoryStore(state => state.categories)

  const [filters, setFilters] = useState({
    categoryId: 0,
    name: '',
    price: 0
  })

  const handleFilter = () => {
    if (!filters.categoryId && !filters.name && !filters.price) return products

    return products.filter(
      product =>
        (!filters.categoryId || product.category_id === filters.categoryId) &&
        (!filters.name ||
          product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.price || product.price < filters.price)
    )
  }

  const filteredProducts = handleFilter()

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value
    }))
  }

  console.log(filters)
  return (
    <AppLayout>
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          Todos nuestros productos
        </h2>

        {/* Filtros */}
        <div className='flex w-1/2 m-auto gap-4'>
          <div className='mb-4'>
            <input
              type='text'
              name='name'
              placeholder='Buscar productos...'
              value={filters.name}
              onChange={handleInputChange}
              className='border border-gray-300 rounded p-2 w-full'
            />
          </div>

          <div className='mb-4'>
            <input
              type='number'
              name='price'
              placeholder='Precio máximo...'
              value={filters.price === 0 ? '' : filters.price} // Manejo de valor 0
              onChange={handleInputChange}
              className='border border-gray-300 rounded p-2 w-full'
            />
          </div>

          <div className='mb-4'>
            <select
              name='categoryId'
              value={filters.categoryId}
              onChange={handleInputChange}
              className='border border-gray-300 rounded p-2 w-full'
            >
              <option value={0}>Selecciona una categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de productos */}
        <div className='px-10 py-7'>
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ProductsNotFound />
          )}
        </div>
      </div>
    </AppLayout>
  )
}
