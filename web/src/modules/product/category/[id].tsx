import { useParams } from 'wouter'
import AppLayout from '../../../common/components/AppLayout'
import useCategoryStore from '../../../common/stores/useCategoryStore'
import useProductStore from '../../../common/stores/useProductStore'
import ProductCard from '../components/ProductCard'
import ProductsNotFound from '../components/ProductsNotFound'

export default function ProductCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const idParsed = parseInt(id)
  const getCategoryById = useCategoryStore(state => state.getCategoryById)
  const getByCategoryId = useProductStore(state => state.getByCategoryId)

  const category = getCategoryById(idParsed)
  const products = getByCategoryId(idParsed)

  return (
    <AppLayout>
      <section className='relative flex items-center justify-center p-16 h-72'>
        <img
          src='/banner.jpg'
          alt='home-banner'
          className='absolute top-0 left-0 w-full h-full object-cover -z-10 contrast-125 brightness-75'
        />
        <div className='text-center text-white'>
          <h1 className='text-6xl font-bold'>{category.name}</h1>
        </div>
      </section>
      <section className='p-10'>
        {products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ProductsNotFound />
        )}
      </section>
    </AppLayout>
  )
}
